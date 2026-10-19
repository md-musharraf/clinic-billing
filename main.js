const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, protocol, net, shell, dialog, Menu } = require('electron');
const api = require('./lib/server-api');

// Isolate user data profile if needed
const useRepoDb = !app.isPackaged;
const dataDir = useRepoDb ? path.join(__dirname, 'prisma') : app.getPath('userData');
fs.mkdirSync(dataDir, { recursive: true });

const serveStatic = app.isPackaged || process.env.MEDBILLING_STATIC === '1';
const outDir = path.join(__dirname, 'out');
const APP_ORIGIN = 'app://-';

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

let mainWindow = null;
let prisma = null;
let dbError = null;

const ctx = {
  prisma: null,
  dataDir,
  notify: (model) => mainWindow?.webContents.send('db-changed', model),
};

async function initDatabase() {
  try {
    let PrismaClient;
    const clientDir = path.join(__dirname, 'prisma', 'client');
    if (fs.existsSync(clientDir)) {
      ({ PrismaClient } = require(clientDir));
    } else {
      ({ PrismaClient } = require('@prisma/client'));
    }

    const dbFile = path.join(dataDir, 'dev.db');
    prisma = new PrismaClient({
      datasources: { db: { url: `file:${dbFile.replace(/\\/g, '/')}` } },
    });
    ctx.prisma = prisma;

    // Run schema.sql if database was just created
    const schemaSqlPath = path.join(__dirname, 'prisma', 'schema.sql');
    if (fs.existsSync(schemaSqlPath)) {
      const sqlContent = fs.readFileSync(schemaSqlPath, 'utf8');
      const statements = sqlContent
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      for (const stmt of statements) {
        try {
          await prisma.$executeRawUnsafe(stmt);
        } catch (e) {
          // table already exists is fine
        }
      }
    }

    // Seed default items and settings
    await api.seedDefaults(prisma);
    console.log('Database initialized successfully at:', dbFile);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    dbError = err.message;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    title: 'MedBilling — Clinical SaaS & Pharmacy System',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
    show: false,
    backgroundColor: '#0F172A',
  });

  Menu.setApplicationMenu(null);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (serveStatic) {
    mainWindow.loadURL(`${APP_ORIGIN}/`);
  } else {
    mainWindow.loadURL('http://localhost:3000/');
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Custom Protocol for static packaged app
function registerCustomProtocol() {
  protocol.handle('app', async (request) => {
    const url = new URL(request.url);

    // Intercept dynamic API requests in Electron static/offline mode
    if (url.pathname.startsWith('/api/')) {
      const routeName = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');
      let body = {};
      if (request.method === 'POST') {
        try {
          body = await request.json();
        } catch {
          body = {};
        }
      }
      const res = await api.callRoute(ctx, request.method, routeName, body);
      return new Response(JSON.stringify(res.json), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let filePath = path.join(outDir, decodeURIComponent(url.pathname));

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(outDir, 'index.html');
    }

    return net.fetch(`file:///${filePath.replace(/\\/g, '/')}`);
  });
}

// Register IPC handlers
ipcMain.handle('ping', () => 'pong');

ipcMain.handle('db-query', async (_e, payload) => {
  if (!prisma) return { success: false, error: `Database not initialized: ${dbError}` };
  try {
    const data = await api.dbQuery(prisma, payload, ctx);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Auth Handlers
ipcMain.handle('auth-login', async (_e, data) => (await api.callRoute(ctx, 'POST', 'auth/login', data)).json);
ipcMain.handle('auth-recover', async (_e, data) => (await api.callRoute(ctx, 'POST', 'auth/recover', data)).json);
ipcMain.handle('auth-setup-status', async () => (await api.callRoute(ctx, 'GET', 'auth/setup-status')).json);
ipcMain.handle('auth-setup', async (_e, data) => (await api.callRoute(ctx, 'POST', 'auth/setup', data)).json);

ipcMain.handle('license-check', async () => {
  if (!prisma) return { valid: true, status: 'TRIAL', daysRemaining: 30 };
  return (await api.callRoute(ctx, 'GET', 'license/check')).json;
});

ipcMain.handle('license-activate', async (_e, key) => {
  if (!prisma) return { success: false, error: 'Database not initialized' };
  return (await api.callRoute(ctx, 'POST', 'license/activate', { licenseKey: key })).json;
});

ipcMain.handle('license-generate-admin-key', async (_e, data) => {
  return (await api.callRoute(ctx, 'POST', 'license/generate-admin-key', data)).json;
});

ipcMain.handle('backup-export', async () => {
  return (await api.callRoute(ctx, 'POST', 'backup/export')).json;
});

ipcMain.handle('backup-restore', async (_e, file) => {
  return (await api.callRoute(ctx, 'POST', 'backup/restore', { file })).json;
});

ipcMain.handle('print-receipt', async () => {
  if (!mainWindow) return false;
  mainWindow.webContents.print({ silent: false, printBackground: true });
  return true;
});

app.whenReady().then(async () => {
  registerCustomProtocol();
  await initDatabase();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
