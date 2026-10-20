const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, protocol, net, shell, Menu } = require('electron');
const api = require('./lib/server-api');

// MEDBILLING_USER_DATA gives tests (and portable installs) an isolated profile + database.
if (process.env.MEDBILLING_USER_DATA) app.setPath('userData', path.resolve(process.env.MEDBILLING_USER_DATA));
// Dev keeps using prisma/dev.db; installs and isolated profiles keep it in userData.
const useRepoDb = !app.isPackaged && !process.env.MEDBILLING_USER_DATA;
const dataDir = useRepoDb ? path.join(__dirname, 'prisma') : app.getPath('userData');
fs.mkdirSync(dataDir, { recursive: true });
// The Prisma client (with its native engine) and schema.sql ship next to app.asar, not inside it.
const resourcesDir = app.isPackaged ? process.resourcesPath : __dirname;

const serveStatic = app.isPackaged || process.env.MEDBILLING_STATIC === '1';
const outDir = path.join(__dirname, 'out');
const APP_ORIGIN = 'app://-';
const WINDOW_BG = '#0F172A';

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
    const clientDir = path.join(resourcesDir, 'prisma', 'client');
    const engine = fs.readdirSync(clientDir).find((f) => f.startsWith('query_engine'));
    if (engine) process.env.PRISMA_QUERY_ENGINE_LIBRARY = path.join(clientDir, engine);
    const { PrismaClient } = require(clientDir);

    const dbFile = path.join(dataDir, 'dev.db');
    prisma = new PrismaClient({
      datasources: { db: { url: `file:${dbFile.replace(/\\/g, '/')}` } },
    });
    ctx.prisma = prisma;

    // A copy of the database is kept before a new version touches it, then tables are created/extended.
    const sql = fs.readFileSync(path.join(resourcesDir, 'prisma', 'schema.sql'), 'utf8');
    const { backup } = await api.upgradeDatabase(prisma, sql, { dataDir, version: app.getVersion() });
    if (backup) console.log('Saved a copy before this update:', backup);

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
    title: 'MedBilling',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
    show: false,
    backgroundColor: WINDOW_BG,
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

    // Dynamic API requests in Electron static/offline mode
    if (url.pathname.startsWith('/api/')) return api.handleRequest(ctx, request);

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

ipcMain.handle('db-query', async (_e, payload) => {
  if (!prisma) return { success: false, error: `Database not initialized: ${dbError}` };
  try {
    const data = await api.dbQuery(prisma, payload, ctx);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Every other backend route (auth, licence, backup, owner summary) goes through one channel.
ipcMain.handle('api', async (_e, { route, body }) => (await api.callRoute(ctx, 'POST', route, body)).json);

// Page margins are painted with the window's background colour, so the window turns white while printing.
async function onWhitePage(fn) {
  mainWindow.setBackgroundColor('#ffffff');
  try {
    return await fn();
  } finally {
    mainWindow.setBackgroundColor(WINDOW_BG);
  }
}

ipcMain.handle('print-receipt', () =>
  onWhitePage(() => new Promise((resolve) => mainWindow.webContents.print({ silent: false, printBackground: true }, (success, reason) => resolve({ success, reason })))),
);

// "Download PDF" on a bill (also the way out when no printer works): exactly what the printer would get,
// saved in Documents\MedBilling Bills. Only PDFs in that folder can be opened from the screen.
const billsDir = () => path.join(app.getPath('documents'), 'MedBilling Bills');
ipcMain.handle('save-pdf', async (_e, name) => {
  try {
    const pdf = await onWhitePage(() => mainWindow.webContents.printToPDF({ printBackground: true, preferCSSPageSize: true }));
    fs.mkdirSync(billsDir(), { recursive: true });
    const file = path.join(billsDir(), `${String(name || 'bill').replace(/[^\w.-]+/g, '_')}.pdf`);
    fs.writeFileSync(file, pdf);
    return { success: true, path: file };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
ipcMain.handle('open-pdf', async (_e, file) => {
  const full = path.resolve(String(file));
  if (path.dirname(full) !== billsDir() || path.extname(full).toLowerCase() !== '.pdf') return 'Not a saved bill';
  return shell.openPath(full); // '' when it opened
});

// ==================== AUTO-UPDATE ====================
// New versions come from GitHub Releases (.github/workflows/release.yml publishes one for every v* tag).
// The installer downloads in the background (checked against its sha512) and installs silently when the
// clinic closes MedBilling, or at once from "Restart now". No internet = no check, the clinic keeps working.
// Tests run on MEDBILLING_USER_DATA and never update, unless MEDBILLING_UPDATE_URL gives them a local feed.
let updateReady = null;
function startAutoUpdates() {
  const testFeed = process.env.MEDBILLING_UPDATE_URL;
  if (!app.isPackaged || (process.env.MEDBILLING_USER_DATA && !testFeed)) return;
  const { autoUpdater } = require('electron-updater');
  if (testFeed) {
    autoUpdater.setFeedURL({ provider: 'generic', url: testFeed });
    autoUpdater.autoInstallOnAppQuit = false; // a test feed's "installer" is never run
  }
  autoUpdater.on('update-downloaded', (info) => {
    updateReady = { version: info.version };
    mainWindow?.webContents.send('update-ready', updateReady);
  });
  autoUpdater.on('error', (err) => console.warn('Update check failed:', err.message));
  const check = () => autoUpdater.checkForUpdates().catch(() => {});
  check();
  setInterval(check, 4 * 60 * 60 * 1000);
  ipcMain.handle('update-install', () => autoUpdater.quitAndInstall(true, true));
}
ipcMain.handle('update-status', () => updateReady);

app.whenReady().then(async () => {
  registerCustomProtocol();
  await initDatabase();
  createWindow();
  startAutoUpdates();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
