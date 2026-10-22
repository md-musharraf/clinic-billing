// lib/server-api.js
// Universal backend service shared by Electron main process and Next.js dev API route.
// Handles Prisma DB queries, offline hardware licensing, automated trial, and backups.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const bcrypt = require('bcryptjs');
const defaultItems = require('./default-items.json');
const { isAdmin } = require('./roles');
const { summarize } = require('./billing-summary');
const { EMPTY_CLINIC, IMAGE_FIELDS, pickClinic } = require('./clinic-fields');
const ipd = require('./ipd');

// Licences are made on the admin dashboard (same server and key secret as JharLab).
const SECRET_SALT = process.env.LICENSE_SECRET_SALT || 'Musharraf_709121SaltKey';
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL || 'https://adminlabmanagement.vercel.app';
const PRODUCT = 'medbilling';
const KEY_TAG = 'MEDBILLING'; // dashboard keys for this app end in |MEDBILLING, so a JharLab key cannot unlock it
const TRIAL_DAYS = 7;
const LOCKS = {
  PAUSED: 'Your MedBilling licence is paused by the administrator. Please contact support to resume.',
  STOPPED: 'Your MedBilling licence has been stopped by the administrator. Please contact support.',
  DELETED: 'This computer is no longer registered for MedBilling. Please contact support.',
};

class AccessError extends Error {
  constructor(msg = 'Access denied') {
    super(msg);
    this.name = 'AccessError';
  }
}

// Signed-in user for this window. Set by auth/login + auth/setup, cleared by auth/logout.
function requireSession(ctx, ownerOnly = false) {
  const user = ctx.session;
  if (!user) throw new AccessError('Session expired. Please sign in again.');
  if (ownerOnly && !isAdmin(user.role)) throw new AccessError('Only the clinic owner can do this.');
  return user;
}

// ==================== HARDWARE & LICENSING ====================
let cachedMachineId = null;

function getMachineId() {
  if (cachedMachineId) return cachedMachineId;
  try {
    if (process.platform === 'win32') {
      const out = execSync('reg query HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid', {
        encoding: 'utf8',
        windowsHide: true,
      });
      const m = /MachineGuid\s+REG_SZ\s+(\S+)/.exec(out);
      if (m) cachedMachineId = m[1].trim();
    } else if (process.platform === 'darwin') {
      cachedMachineId = execSync("ioreg -rd1 -c IOPlatformExpertDevice | awk -F'\"' '/IOPlatformUUID/{print $4}'", {
        encoding: 'utf8',
      }).trim();
    } else {
      cachedMachineId = execSync('cat /var/lib/dbus/machine-id /etc/machine-id 2>/dev/null | head -n 1', {
        encoding: 'utf8',
      }).trim();
    }
  } catch (e) {
    console.error('Failed to get Machine ID:', e.message);
  }
  return cachedMachineId || 'MED-DEVICE-DEFAULT-001';
}

const licenseKeyBytes = () => crypto.createHash('sha256').update(SECRET_SALT).digest();
const sameMachine = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
const DAY = 24 * 60 * 60 * 1000;
const isoDay = (d) => d.toISOString().slice(0, 10);

// Same format the admin dashboard writes. The app never makes keys itself; tests use this.
function encryptLicenseKey(machineId, expiryDate) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', licenseKeyBytes(), iv);
  const enc = cipher.update(`${machineId}|${expiryDate}|${KEY_TAG}`, 'utf8', 'hex') + cipher.final('hex');
  return (iv.toString('hex') + enc).toUpperCase();
}

function decryptLicenseKey(licenseKey) {
  try {
    const clean = String(licenseKey || '').trim().toLowerCase();
    if (clean.length <= 32) return null;
    const decipher = crypto.createDecipheriv('aes-256-cbc', licenseKeyBytes(), Buffer.from(clean.slice(0, 32), 'hex'));
    const parts = (decipher.update(clean.slice(32), 'hex', 'utf8') + decipher.final('utf8')).split('|');
    return parts.length === 3 && parts[2] === KEY_TAG ? { machineId: parts[0], expiryDate: parts[1] } : null;
  } catch {
    return null;
  }
}

function validateLicenseKey(licenseKey) {
  const d = decryptLicenseKey(licenseKey);
  if (!d) return { valid: false, reason: 'This is not a MedBilling licence key.' };
  if (!sameMachine(d.machineId, getMachineId())) return { valid: false, reason: "This key is for another computer's Machine ID." };
  const expiry = new Date(d.expiryDate);
  if (isNaN(expiry.getTime())) return { valid: false, reason: 'The key has an invalid expiry date.' };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (expiry < today) return { valid: false, reason: `Your MedBilling licence expired on ${expiry.toDateString()}.`, expiry };
  return { valid: true, expiry };
}

// The License row also remembers a pause/stop/delete from the dashboard, so it survives restarts and no internet.
async function licenseRow(prisma) {
  const machineId = getMachineId();
  return (await prisma.license.findUnique({ where: { machineId } }))
    || prisma.license.create({ data: { machineId, status: 'TRIAL', tier: 'TRIAL' } });
}

// What this PC may do, from the local row only: a dashboard lock, else a valid key, else the 30-day trial.
function evaluate(lic) {
  const base = { machineId: lic.machineId };
  if (LOCKS[lic.status]) return { ...base, valid: false, status: lic.status, tier: 'LOCKED', daysRemaining: 0, reason: LOCKS[lic.status] };
  const key = lic.licenseKey ? validateLicenseKey(lic.licenseKey) : null;
  if (key?.valid) {
    return { ...base, valid: true, status: 'ACTIVE', tier: 'PRO', expiryDate: isoDay(key.expiry), daysRemaining: Math.ceil((key.expiry - Date.now()) / DAY) };
  }
  const trialEnd = new Date(new Date(lic.trialStartedAt).getTime() + TRIAL_DAYS * DAY);
  if (trialEnd > new Date()) {
    return { ...base, valid: true, status: 'TRIAL', tier: 'TRIAL', expiryDate: isoDay(trialEnd), daysRemaining: Math.ceil((trialEnd - Date.now()) / DAY) };
  }
  return {
    ...base,
    valid: false,
    status: 'EXPIRED',
    tier: 'EXPIRED',
    expiryDate: isoDay(key?.expiry || trialEnd),
    daysRemaining: 0,
    reason: key?.reason || `Your ${TRIAL_DAYS}-day trial has ended. Send your Machine ID to the administrator for a licence key.`,
  };
}

// Same check JharLab makes: GET /api/license/status, plus product=medbilling. Pause/stop/delete lock this PC,
// a key renewed on the dashboard installs itself. No internet (or a dashboard error) keeps the last answer.
async function syncWithDashboard(prisma, lic) {
  let res;
  let data;
  try {
    res = await fetch(`${ADMIN_URL}/api/license/status?product=${PRODUCT}&machineId=${encodeURIComponent(lic.machineId)}`, {
      // The dashboard answers in ~1.5-2 s warm from India, more on a cold start or slow line; nothing waits on this.
      signal: AbortSignal.timeout(10_000),
      headers: { 'Cache-Control': 'no-cache' },
    });
    data = await res.json();
  } catch {
    return lic;
  }
  let { status, licenseKey } = lic;
  if (res.ok && data.success) {
    status = data.status === 'PAUSED' || data.status === 'STOPPED' ? data.status : 'ACTIVE';
    if (data.licenseKey && data.licenseKey !== licenseKey && validateLicenseKey(data.licenseKey).valid) licenseKey = data.licenseKey;
  } else if (res.status === 404 && data.status === 'DELETED') {
    // A PC on its free trial (or holding an old self-made key) was never registered: only a dashboard key locks.
    if (decryptLicenseKey(lic.licenseKey)) status = 'DELETED';
  } else {
    return lic;
  }
  if (status === lic.status && licenseKey === lic.licenseKey) return lic;
  return prisma.license.update({
    where: { id: lic.id },
    data: { status, licenseKey, ...(licenseKey !== lic.licenseKey && { activatedAt: new Date() }) },
  });
}

async function checkLicense(prisma) {
  try {
    return evaluate(await syncWithDashboard(prisma, await licenseRow(prisma)));
  } catch (e) {
    // A broken database should not also lock the clinic out of its billing.
    return { valid: true, status: 'TRIAL', tier: 'TRIAL', machineId: getMachineId(), daysRemaining: TRIAL_DAYS, error: e.message };
  }
}

// A key pasted by hand (normally the dashboard installs it on the next check). Does not lift a dashboard lock.
async function activateLicense(prisma, licenseKey) {
  const v = validateLicenseKey(licenseKey);
  if (!v.valid) return { success: false, error: v.reason };
  const lic = await licenseRow(prisma);
  await prisma.license.update({
    where: { id: lic.id },
    data: { licenseKey: String(licenseKey).trim(), activatedAt: new Date(), ...(!LOCKS[lic.status] && { status: 'ACTIVE' }) },
  });
  return { success: true, message: 'License activated successfully!' };
}

// ==================== DEFAULT CATALOG SEEDING ====================
async function seedDefaults(prisma) {
  try {
    const count = await prisma.catalogItem.count();
    if (count === 0 && Array.isArray(defaultItems)) {
      console.log(`Seeding ${defaultItems.length} default clinic catalog items...`);
      // One statement: all or nothing, so a crash or a second start never leaves half a catalog behind.
      await prisma.catalogItem.createMany({
        data: defaultItems.map((item) => ({
          code: item.code,
          name: item.name,
          category: item.category,
          defaultPrice: item.defaultPrice,
          unit: item.unit || 'unit',
          taxPercent: item.taxPercent || 0,
          stock: item.stock || 100,
          isCustom: false,
        })),
      });
      console.log('Seeding complete.');
    }

    // X-Ray and Ultrasound got their own categories; older installs filed the seeded ones under Lab Test.
    for (const item of defaultItems.filter((i) => i.category === 'X-Ray' || i.category === 'Ultrasound')) {
      await prisma.catalogItem.updateMany({ where: { code: item.code, category: 'Lab Test' }, data: { category: item.category } });
    }

    const sCount = await prisma.clinicSettings.count();
    if (sCount === 0) {
      // Blank on purpose: the first-run Setup fills it in (no sample GSTIN or doctor on real invoices).
      await prisma.clinicSettings.create({ data: { id: 1, ...toDb(pickClinic(EMPTY_CLINIC)) } });
    }
  } catch (e) {
    console.warn('Seed defaults skipped/failed:', e.message);
  }
}

async function ensureSchema(prisma, sqlContent) {
  if (!sqlContent) return;
  const statements = sqlContent
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
    } catch {
      // ignore table exists errors
    }
  }
}

// ==================== UPDATES WITHOUT DATA LOSS ====================
// The app version that last opened a database is kept in the file itself (PRAGMA user_version): 1.4.0 -> 10400.
const versionCode = (v) => String(v).split('.').slice(0, 3).reduce((n, p) => n * 100 + (parseInt(p, 10) || 0), 0);
const versionName = (c) => [Math.floor(c / 10000), Math.floor(c / 100) % 100, c % 100].join('.');

// Opens the database for this app version. When a different version used it last, an untouched copy is
// saved in backups/ first (never pruned), then new tables are added and the version recorded.
async function upgradeDatabase(prisma, sql, { dataDir, version }) {
  const code = versionCode(version);
  const was = Number((await prisma.$queryRawUnsafe('PRAGMA user_version'))[0].user_version);
  let backup = null;
  if (was !== code && (await prisma.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type='table' AND name='User'")).length) {
    const dir = path.join(dataDir, 'backups');
    fs.mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
    backup = path.join(dir, `medbilling-preupdate-${was ? versionName(was) : 'old'}-to-${version}-${stamp}.db`);
    await prisma.$executeRawUnsafe(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
  }
  await ensureSchema(prisma, sql);
  if (was !== code) await prisma.$executeRawUnsafe(`PRAGMA user_version = ${code}`);
  return { backup };
}

// ==================== UNIVERSAL DB QUERY ENGINE ====================
const ALLOWED_MODELS = new Set([
  'clinicSettings',
  'user',
  'patient',
  'doctor',
  'catalogItem',
  'bill',
  'billItem',
  'payment',
  'license',
  'activityLog',
  'admission',
  'admissionCharge',
  'admissionDeposit',
]);
// Admissions change only through the ipd/* routes (their rules live in lib/ipd.js); the screens just read them.
const IPD_MODELS = new Set(['admission', 'admissionCharge', 'admissionDeposit']);

const READ_ACTIONS = new Set(['findMany', 'findUnique', 'findFirst', 'count', 'groupBy', 'aggregate']);
const WRITE_ACTIONS = new Set(['create', 'update', 'upsert', 'delete', 'createMany', 'updateMany', 'deleteMany']);

const OWNER_WRITE_MODELS = new Set(['user', 'license']);
const OWNER_DELETE_MODELS = new Set(['bill', 'billItem', 'payment', 'patient']);

// Only the owner may change logins/licence, delete bills or patients (reception could otherwise take money off the
// books), or hide a patient (patients are "deleted" by setting deletedAt so their bills stay in the reports).
function ownerOnly(model, action, args) {
  if (!WRITE_ACTIONS.has(action)) return false;
  if (OWNER_WRITE_MODELS.has(model)) return true;
  if ((action === 'delete' || action === 'deleteMany') && OWNER_DELETE_MODELS.has(model)) return true;
  return model === 'patient' && [args.data, args.update].some((d) => d && 'deletedAt' in d);
}

// clinicSettings images: data-URL string <-> bytes in the BLOB column.
function toDb(data) {
  for (const f of IMAGE_FIELDS) if (typeof data?.[f] === 'string') data[f] = data[f] ? Buffer.from(data[f]) : null;
  return data;
}
function fromDb(row) {
  if (Array.isArray(row)) return row.map(fromDb);
  for (const f of IMAGE_FIELDS) {
    if (row && Buffer.isBuffer(row[f])) {
      const text = row[f].toString();
      row[f] = text.startsWith('data:image/') ? text : '';
    }
  }
  return row;
}

// Next PREFIX-0001 after the highest one used (a count would reuse a number once a bill is deleted).
async function nextNumber(table, field, prefix, digits) {
  const last = await table.findFirst({ where: { [field]: { startsWith: prefix } }, orderBy: { [field]: 'desc' }, select: { [field]: true } });
  const n = last ? (parseInt(last[field].slice(prefix.length), 10) || 0) + 1 : 1;
  return prefix + String(n).padStart(digits, '0');
}

async function dbQuery(prisma, { model, action, args = {} }, ctx = {}) {
  if (!ALLOWED_MODELS.has(model) || !(READ_ACTIONS.has(action) || WRITE_ACTIONS.has(action))) {
    throw new Error(`Unauthorized or invalid query model/action: ${model}.${action}`);
  }
  requireSession(ctx, ownerOnly(model, action, args));
  if (IPD_MODELS.has(model) && WRITE_ACTIONS.has(action)) throw new Error('Change admissions from the Admissions screen.');
  if (model === 'clinicSettings') [args.data, args.create, args.update].forEach(toDb);

  // Handle password hashing on user creation or password update
  if (model === 'user') {
    if (args.data?.password && !args.data.password.startsWith('$2a$') && !args.data.password.startsWith('$2b$')) {
      args.data.password = await bcrypt.hash(args.data.password, 12);
    }
    if (args.update?.password && !args.update.password.startsWith('$2a$') && !args.update.password.startsWith('$2b$')) {
      args.update.password = await bcrypt.hash(args.update.password, 12);
    }
  }

  // Auto-generate Bill Number if creating a bill
  if (model === 'bill' && action === 'create' && args.data) {
    if (!args.data.billNo) {
      const dateStr = new Date().toLocaleDateString('en-CA').replace(/-/g, ''); // local date, not UTC
      args.data.billNo = await nextNumber(prisma.bill, 'billNo', `MED-BIL-${dateStr}-`, 4);
    }

    if (!args.data.clinicSnapshot) {
      const settings = await prisma.clinicSettings.findFirst();
      if (settings) {
        args.data.clinicSnapshot = JSON.stringify({
          clinicName: settings.clinicName,
          address: settings.address,
          phone: settings.phone,
          dlNumber: settings.dlNumber,
          gstin: settings.gstin,
          doctorName: settings.doctorName,
        });
      }
    }
  }

  // Auto-generate Patient ID/UHID
  if (model === 'patient' && action === 'create' && args.data) {
    if (!args.data.id) {
      args.data.id = await nextNumber(prisma.patient, 'id', `MED-${new Date().getFullYear()}-`, 5);
    }
    if (!args.data.uhid) {
      args.data.uhid = args.data.id;
    }
  }

  const result = await prisma[model][action](args);
  if (model === 'clinicSettings') fromDb(result);

  if (WRITE_ACTIONS.has(action) && typeof ctx.notify === 'function') {
    ctx.notify(model);
  }

  return result;
}

// ==================== DATABASE BACKUP & RESTORE ====================
function backupDatabase(dataDir) {
  let dbPath = path.join(dataDir, 'dev.db');
  if (!fs.existsSync(dbPath)) {
    dbPath = path.join(dataDir, 'prisma', 'dev.db');
  }
  if (!fs.existsSync(dbPath)) {
    dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
  }
  if (!fs.existsSync(dbPath)) return { success: false, error: 'Database file not found.' };

  const backupDir = path.join(path.dirname(dbPath), 'backups');
  fs.mkdirSync(backupDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `backup-${timestamp}.db`);
  fs.copyFileSync(dbPath, backupFile);

  return {
    success: true,
    file: backupFile,
    fileName: path.basename(backupFile),
    size: fs.statSync(backupFile).size,
  };
}

function restoreDatabase(sourceFile, dataDir) {
  if (!fs.existsSync(sourceFile)) {
    return { success: false, error: 'Backup source file does not exist.' };
  }
  let dbPath = path.join(dataDir, 'dev.db');
  if (!fs.existsSync(dbPath) && fs.existsSync(path.join(dataDir, 'prisma', 'dev.db'))) {
    dbPath = path.join(dataDir, 'prisma', 'dev.db');
  } else if (!fs.existsSync(dbPath) && fs.existsSync(path.join(__dirname, '..', 'prisma', 'dev.db'))) {
    dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
  }

  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, dbPath + '.before-restore.bak');
  }
  fs.copyFileSync(sourceFile, dbPath);
  return { success: true, message: 'Database restored successfully.' };
}

// ==================== ROUTE DISPATCHER ====================
const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role });

async function callRoute(ctx, method, routeName, body = {}) {
  const { prisma, dataDir } = ctx;
  if (!prisma) return { status: 503, json: { error: 'Database not initialized' } };

  try {
    return await handleRoute(ctx, prisma, dataDir, routeName, body);
  } catch (err) {
    return { status: err instanceof AccessError ? 401 : 500, json: { success: false, error: err.message } };
  }
}

async function handleRoute(ctx, prisma, dataDir, routeName, body) {
  // API DB Handler
  if (routeName === 'db') {
    return { status: 200, json: { success: true, data: await dbQuery(prisma, body, ctx) } };
  }

  // Admitted patients: admit, charge, deposit, discharge (lib/ipd.js).
  if (routeName.startsWith('ipd/')) {
    const user = requireSession(ctx);
    try {
      const data = await ipd.route(prisma, user, routeName.slice(4), body, { nextNumber });
      ['admission', 'bill', 'patient'].forEach((m) => ctx.notify?.(m));
      return { status: 200, json: { success: true, data } };
    } catch (e) {
      if (e instanceof ipd.IpdError) return { status: 400, json: { success: false, error: e.message } };
      throw e;
    }
  }

  // Owner dashboard: every bill in [from, to] (local dates, inclusive) summed by fee type, doctor, day and patient.
  if (routeName === 'owner/summary') {
    requireSession(ctx, true);
    const day = (s) => {
      const [y, m, d] = String(s || '').split('-').map(Number);
      return y && m && d ? new Date(y, m - 1, d) : null;
    };
    const from = day(body.from);
    const to = day(body.to);
    if (!from || !to || to < from) return { status: 400, json: { success: false, error: 'Pick a valid date range.' } };
    to.setDate(to.getDate() + 1);
    const range = { gte: from, lt: to };
    const [bills, newPatients, deposits, admitted] = await Promise.all([
      prisma.bill.findMany({ where: { createdAt: range }, include: { items: true, admission: { select: { id: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.patient.count({ where: { registeredAt: range, deletedAt: null } }),
      // IPD money counts on the day it was received, not on the discharge bill's date.
      prisma.admissionDeposit.findMany({ where: { receivedAt: range } }),
      prisma.admission.findMany({ where: { status: 'ADMITTED' }, include: { charges: true, deposits: true } }),
    ]);
    const data = summarize(bills, newPatients, { deposits });
    const now = admitted.map((a) => ipd.buildBill(a));
    data.inHospital = {
      patients: admitted.length,
      billed: now.reduce((s, x) => s + x.totalAmount, 0),
      deposits: now.reduce((s, x) => s + x.paid, 0),
      due: now.reduce((s, x) => s + Math.max(0, x.due), 0),
    };
    return { status: 200, json: { success: true, data } };
  }

  // Auth: Setup status
  if (routeName === 'auth/setup-status') {
    const adminCount = await prisma.user.count({
      where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } },
    });
    return { status: 200, json: { isSetupRequired: adminCount === 0 } };
  }

  // Auth: Setup first admin
  if (routeName === 'auth/setup') {
    const { name, email, password } = body;
    const clinic = pickClinic(body.clinic);
    const adminCount = await prisma.user.count({
      where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } },
    });
    if (adminCount > 0) {
      return { status: 400, json: { error: 'Setup is already complete. Please login.' } };
    }
    if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
      return { status: 400, json: { error: 'Name, email and a password of at least 6 characters are required.' } };
    }
    if (!clinic.clinicName) {
      return { status: 400, json: { error: 'Clinic name is required.' } };
    }

    const recoveryCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8-char recovery
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: await bcrypt.hash(password, 12),
        recoveryHash: await bcrypt.hash(recoveryCode, 10),
        role: 'SUPER_ADMIN',
      },
    });
    await prisma.clinicSettings.upsert({
      where: { id: 1 },
      update: toDb({ ...clinic }),
      create: { id: 1, ...toDb({ ...pickClinic(EMPTY_CLINIC), ...clinic }) },
    });

    ctx.session = publicUser(user);
    return { status: 200, json: { success: true, user: ctx.session, recoveryCode } };
  }

  // Auth: Login. portal = 'owner' | 'reception' keeps the two logins separate.
  if (routeName === 'auth/login') {
    const { email, password, portal } = body;
    const user = await prisma.user.findUnique({
      where: { email: String(email || '').trim().toLowerCase() },
    });
    if (!user || !user.isActive || !(await bcrypt.compare(String(password || ''), user.password))) {
      return { status: 401, json: { error: 'Invalid email or password.' } };
    }
    if (portal === 'owner' && !isAdmin(user.role)) {
      return { status: 403, json: { error: 'This is a reception account. Use the Reception login.' } };
    }
    if (portal === 'reception' && isAdmin(user.role)) {
      return { status: 403, json: { error: 'This is an owner account. Use the Owner login.' } };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    ctx.session = publicUser(user);
    return { status: 200, json: { success: true, user: ctx.session } };
  }

  // Auth: Recovery
  if (routeName === 'auth/recover') {
    const { email, recoveryCode, newPassword } = body;
    const user = await prisma.user.findUnique({
      where: { email: String(email || '').trim().toLowerCase() },
    });
    if (!user || !user.recoveryHash) {
      return { status: 400, json: { error: 'No recovery code found for this user.' } };
    }
    if (!(await bcrypt.compare(String(recoveryCode || '').trim().toUpperCase(), user.recoveryHash))) {
      return { status: 400, json: { error: 'Incorrect recovery code.' } };
    }
    if (!newPassword || newPassword.length < 6) {
      return { status: 400, json: { error: 'New password must be at least 6 characters.' } };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    return { status: 200, json: { success: true, message: 'Password updated successfully!' } };
  }

  // Auth: Logout
  if (routeName === 'auth/logout') {
    ctx.session = null;
    return { status: 200, json: { success: true } };
  }

  // Licensing
  if (routeName === 'license/check') {
    const lic = await checkLicense(prisma);
    return { status: 200, json: lic };
  }

  if (routeName === 'license/activate') {
    const res = await activateLicense(prisma, body.licenseKey);
    return { status: res.success ? 200 : 400, json: res };
  }


  // Backups
  if (routeName.startsWith('backup/')) requireSession(ctx, true);
  if (routeName === 'backup/export') {
    const res = backupDatabase(dataDir);
    return { status: res.success ? 200 : 500, json: res };
  }

  if (routeName === 'backup/restore') {
    const res = restoreDatabase(body.file, dataDir);
    return { status: res.success ? 200 : 500, json: res };
  }

  return { status: 404, json: { error: `Route not found: ${routeName}` } };
}

async function handleRequest(ctx, request) {
  const url = new URL(request.url);
  const name = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');
  const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
  const r = await callRoute(ctx, request.method, name, body);
  return new Response(JSON.stringify(r.json), {
    status: r.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = {
  getMachineId,
  encryptLicenseKey,
  decryptLicenseKey,
  checkLicense,
  activateLicense,
  seedDefaults,
  ensureSchema,
  upgradeDatabase,
  dbQuery,
  backupDatabase,
  restoreDatabase,
  callRoute,
  handleRequest,
  AccessError,
};
