// Run: npm test. First-run setup, who may delete what, and logo storage, on a throwaway database.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ||= 'http://127.0.0.1:9'; // keep the licence check offline
const api = require('../lib/server-api');
const { PrismaClient } = require('../prisma/client');

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'medbilling-access-'));
  const prisma = new PrismaClient({ datasources: { db: { url: `file:${path.join(dir, 'test.db').replace(/\\/g, '/')}` } } });
  const ctx = { prisma, dataDir: dir };
  const q = (model, action, args) => api.dbQuery(prisma, { model, action, args }, ctx);
  const route = async (name, body) => (await api.callRoute(ctx, 'POST', name, body)).json;

  try {
    const sql = fs.readFileSync(path.join(__dirname, '../prisma/schema.sql'), 'utf8');
    // A brand-new database has nothing to save; an update to another version keeps a copy first.
    assert.strictEqual((await api.upgradeDatabase(prisma, sql, { dataDir: dir, version: '1.0.0' })).backup, null);
    await api.seedDefaults(prisma);
    assert.strictEqual((await api.upgradeDatabase(prisma, sql, { dataDir: dir, version: '1.0.0' })).backup, null, 'same version: no copy');
    const { backup } = await api.upgradeDatabase(prisma, sql, { dataDir: dir, version: '1.1.0' });
    assert.match(path.basename(backup), /^medbilling-preupdate-1\.0\.0-to-1\.1\.0-/);
    assert.ok(fs.statSync(backup).size > 0);

    // A new install has no sample clinic printed on bills.
    const blank = await prisma.clinicSettings.findFirst();
    assert.strictEqual(blank.clinicName, '');
    assert.strictEqual(blank.gstin, '');

    // First-run setup needs a clinic name, then saves the whole profile and signs the owner in.
    assert.match((await route('auth/setup', { name: 'Dr A', email: 'a@x.test', password: 'secret1', clinic: {} })).error, /Clinic name/);
    const logo = 'data:image/png;base64,iVBORw0KGgo=';
    const setup = await route('auth/setup', {
      name: 'Dr A', email: 'a@x.test', password: 'secret1',
      clinic: { clinicName: 'City Care', address: 'Main Rd', phone: '99999', printColor: '#be123c', printPaperSize: 'Thermal80', logo, bogus: 'x' },
    });
    assert.strictEqual(setup.success, true);
    assert.strictEqual(ctx.session.role, 'SUPER_ADMIN');
    const settings = await q('clinicSettings', 'findFirst', { where: { id: 1 } });
    assert.strictEqual(settings.clinicName, 'City Care');
    assert.strictEqual(settings.printPaperSize, 'Thermal80');
    assert.strictEqual(settings.logo, logo, 'logo comes back as the same data URL');
    await q('clinicSettings', 'update', { where: { id: 1 }, data: { logo: '' } });
    assert.strictEqual((await q('clinicSettings', 'findFirst', {})).logo, null);

    // Reception can bill but cannot delete bills or patients.
    const patient = await q('patient', 'create', { data: { name: 'Ravi', age: 30, gender: 'MALE', mobile: '9000000001' } });
    const bill = await q('bill', 'create', { data: { patientId: patient.id, patientName: 'Ravi', subtotal: 100, totalAmount: 100, paidAmount: 100 } });
    ctx.session = { id: 2, name: 'Desk', role: 'RECEPTIONIST' };
    await q('patient', 'update', { where: { id: patient.id }, data: { age: 31 } });
    for (const [model, action, args] of [
      ['bill', 'delete', { where: { id: bill.id } }],
      ['bill', 'deleteMany', {}],
      ['patient', 'delete', { where: { id: patient.id } }],
      ['patient', 'update', { where: { id: patient.id }, data: { deletedAt: new Date() } }],
      ['user', 'update', { where: { id: 1 }, data: { role: 'RECEPTIONIST' } }],
    ]) {
      await assert.rejects(q(model, action, args), /Only the clinic owner/, `${model}.${action} must be owner-only`);
    }

    // The owner can; a deleted patient keeps their bill.
    ctx.session = { id: 1, name: 'Dr A', role: 'SUPER_ADMIN' };
    await q('patient', 'update', { where: { id: patient.id }, data: { deletedAt: new Date() } });
    assert.strictEqual(await q('patient', 'count', { where: { deletedAt: null } }), 0);
    assert.strictEqual(await q('bill', 'count', {}), 1);

    // 7-day trial on a new PC.
    const lic = await api.checkLicense(prisma);
    assert.strictEqual(lic.status, 'TRIAL');
    assert.ok(lic.daysRemaining <= 7 && lic.daysRemaining >= 6, `trial days ${lic.daysRemaining}`);

    console.log('access: all checks passed');
  } finally {
    await prisma.$disconnect();
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
