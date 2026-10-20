// Run: npm test. MedBilling licence against a fake admin dashboard and a throwaway database (no internet).
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

let reply = { code: 404, body: { success: false, status: 'DELETED' } };
let lastQuery = null;
const server = http.createServer((req, res) => {
  lastQuery = new URL(req.url, 'http://x').searchParams;
  res.writeHead(reply.code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(reply.body));
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL = `http://127.0.0.1:${server.address().port}`;
  const api = require('../lib/server-api');
  const { PrismaClient } = require('../prisma/client');

  const dbFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'medbilling-lic-')), 'test.db');
  const prisma = new PrismaClient({ datasources: { db: { url: `file:${dbFile.replace(/\\/g, '/')}` } } });
  await api.ensureSchema(prisma, fs.readFileSync(path.join(__dirname, '../prisma/schema.sql'), 'utf8'));

  const machineId = api.getMachineId();
  const inDays = (n) => new Date(Date.now() + n * 864e5).toISOString();
  const key = api.encryptLicenseKey(machineId, inDays(365));
  const check = () => api.checkLicense(prisma);

  try {
    // Never registered on the dashboard: free trial, not "deleted".
    let lic = await check();
    assert.strictEqual(lic.status, 'TRIAL');
    assert.strictEqual(lic.valid, true);
    assert.strictEqual(lastQuery.get('product'), 'medbilling');
    assert.strictEqual(lastQuery.get('machineId'), machineId);

    // Registered: the dashboard's key installs itself.
    reply = { code: 200, body: { success: true, status: 'ACTIVE', licenseKey: key, expiryDate: inDays(365) } };
    lic = await check();
    assert.strictEqual(lic.status, 'ACTIVE');
    assert.strictEqual(lic.tier, 'PRO');
    assert.ok(lic.daysRemaining >= 364);

    // Paused on the dashboard: locked, and stays locked with no internet.
    reply = { code: 200, body: { success: true, status: 'PAUSED', licenseKey: key } };
    lic = await check();
    assert.strictEqual(lic.valid, false);
    assert.match(lic.reason, /paused/);
    reply = { code: 500, body: { success: false, error: 'down' } };
    assert.strictEqual((await check()).status, 'PAUSED', 'a dashboard error keeps the lock');

    // Pasting the key again does not lift a pause.
    assert.strictEqual((await api.activateLicense(prisma, key)).success, true);
    assert.strictEqual((await check()).status, 'PAUSED');

    reply = { code: 200, body: { success: true, status: 'ACTIVE', licenseKey: key } };
    assert.strictEqual((await check()).status, 'ACTIVE');

    // Deleted on the dashboard after it issued a key: locked.
    reply = { code: 404, body: { success: false, status: 'DELETED' } };
    assert.strictEqual((await check()).status, 'DELETED');

    // Keys that must be refused.
    const jharlabKey = (() => {
      const iv = crypto.randomBytes(16);
      const c = crypto.createCipheriv('aes-256-cbc', crypto.createHash('sha256').update('Musharraf_709121SaltKey').digest(), iv);
      return (iv.toString('hex') + c.update(`${machineId}|${inDays(365)}`, 'utf8', 'hex') + c.final('hex')).toUpperCase();
    })();
    assert.match((await api.activateLicense(prisma, jharlabKey)).error, /not a MedBilling/);
    assert.match((await api.activateLicense(prisma, api.encryptLicenseKey('OTHER-PC', inDays(30)))).error, /another computer/);
    assert.match((await api.activateLicense(prisma, api.encryptLicenseKey(machineId, inDays(-2)))).error, /expired/);

    // Trial over and the dashboard key ran out: expired.
    await prisma.license.updateMany({ data: { status: 'ACTIVE', trialStartedAt: new Date(Date.now() - 40 * 864e5), licenseKey: api.encryptLicenseKey(machineId, inDays(-1)) } });
    reply = { code: 503, body: {} };
    lic = await check();
    assert.strictEqual(lic.status, 'EXPIRED');
    assert.match(lic.reason, /expired/);

    console.log('license: all checks passed');
  } finally {
    await prisma.$disconnect();
    server.close();
    fs.rmSync(path.dirname(dbFile), { recursive: true, force: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
