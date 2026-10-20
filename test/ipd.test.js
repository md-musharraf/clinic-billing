// Run: npm test. Admitted patients end to end on a throwaway database: deposits, day-wise charges, discharge bill.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ||= 'http://127.0.0.1:9'; // keep the licence check offline
const api = require('../lib/server-api');
const { buildBill, bedDays } = require('../lib/ipd');
const { PrismaClient } = require('../prisma/client');

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'medbilling-ipd-'));
  const prisma = new PrismaClient({ datasources: { db: { url: `file:${path.join(dir, 'test.db').replace(/\\/g, '/')}` } } });
  const ctx = { prisma, dataDir: dir };
  const call = async (name, body) => (await api.callRoute(ctx, 'POST', `ipd/${name}`, body)).json;
  const ok = async (name, body) => {
    const r = await call(name, body);
    assert.ok(r.success, `${name}: ${r.error}`);
    return r.data;
  };
  const reception = { id: 2, name: 'Desk', role: 'RECEPTIONIST' };
  const owner = { id: 1, name: 'Owner', role: 'SUPER_ADMIN' };
  const daysAgo = (n, h = 0) => new Date(Date.now() - n * 864e5 - h * 36e5);

  try {
    await api.ensureSchema(prisma, fs.readFileSync(path.join(__dirname, '../prisma/schema.sql'), 'utf8'));
    await api.seedDefaults(prisma);
    for (const u of [owner, reception]) await prisma.user.create({ data: { id: u.id, name: u.name, email: `${u.id}@x.test`, password: 'x', role: u.role } });

    assert.strictEqual(bedDays(daysAgo(0, 2)), 1, 'two hours = one day');
    assert.strictEqual(bedDays(daysAgo(3, 1)), 4, '3 days 1 hour = four days');

    // Reception admits a new patient with an advance.
    ctx.session = reception;
    let adm = await ok('admit', {
      patient: { name: 'Kamla Devi', mobile: '9000000011', age: 60, gender: 'FEMALE' },
      doctorName: 'Dr. A', ward: 'General Ward', bedNo: '4', bedRate: 800, notes: 'Fever',
      deposit: { amount: 2000, method: 'CASH' },
    });
    assert.match(adm.admissionNo, /^IPD-\d{4}-0001$/);
    assert.match(adm.deposits[0].receiptNo, /^RCPT-\d{8}-0001$/);
    assert.match((await call('admit', { patient: { id: adm.patientId } })).error, /already admitted/);

    // Four days in hospital: charges on different days, a second deposit.
    await prisma.admission.update({ where: { id: adm.id }, data: { admittedAt: daysAgo(3, 1) } });
    adm = await ok('charge', { admissionId: adm.id, items: [{ name: 'CBC', category: 'Lab Test', quantity: 1, unitPrice: 250 }, { name: 'Paracetamol', category: 'Medicine', quantity: 2, unitPrice: 50 }] });
    const old = adm.charges.find((c) => c.itemName === 'CBC');
    await prisma.admissionCharge.update({ where: { id: old.id }, data: { chargedAt: daysAgo(2) } });
    adm = (await ok('deposit', { admissionId: adm.id, amount: 3000, method: 'UPI', reference: 'UPI123' })).admission;
    assert.strictEqual(adm.deposits.length, 2);

    let bill = buildBill(adm);
    assert.strictEqual(bill.days, 4);
    assert.strictEqual(bill.subtotal, 4 * 800 + 250 + 100);
    assert.strictEqual(bill.paid, 5000);
    assert.strictEqual(bill.due, 3550 - 5000, 'deposits exceed the bill: refund due');

    // Rules: reception cannot remove an earlier day's charge, a deposit, or write admissions directly.
    assert.match((await call('charge-delete', { chargeId: old.id })).error, /earlier day/);
    assert.match((await call('deposit-delete', { depositId: adm.deposits[0].id })).error, /owner/);
    assert.match((await call('update', { admissionId: adm.id, bedRate: 100 })).error, /owner/);
    await assert.rejects(api.dbQuery(prisma, { model: 'admissionDeposit', action: 'deleteMany', args: {} }, ctx), /Admissions screen|owner/);
    const todays = adm.charges.find((c) => c.itemName === 'Paracetamol');
    adm = await ok('charge-delete', { chargeId: todays.id });
    adm = await ok('charge', { admissionId: adm.id, items: [{ name: 'Paracetamol', category: 'Medicine', quantity: 2, unitPrice: 50 }] });

    // Discharge: cannot collect more than the bill; a refund is a negative amount.
    assert.match((await call('discharge', { admissionId: adm.id, payment: { amount: 100 } })).error, /more than the bill/);
    const final = await ok('discharge', { admissionId: adm.id, payment: { amount: -1450, method: 'CASH' } });
    assert.strictEqual(final.totalAmount, 3550);
    assert.strictEqual(final.paidAmount, 3550);
    assert.strictEqual(final.dueAmount, 0);
    assert.strictEqual(final.paymentStatus, 'PAID');
    assert.deepStrictEqual(final.payments.map((p) => p.amount), [2000, 3000, -1450]);
    const bed = final.items.find((i) => i.itemCategory === 'Room Charges');
    assert.strictEqual(bed.quantity, 4);
    assert.match(final.notes, /IPD IPD-\d{4}-0001 · Admitted .* · Discharged .* · 4 days · Fever/);
    assert.ok(final.items.some((i) => new Date(i.createdAt) < daysAgo(1)), 'charges keep the day they were added');
    assert.match((await call('deposit', { admissionId: adm.id, amount: 10 })).error, /already discharged/);
    assert.strictEqual((await prisma.admission.findUnique({ where: { id: adm.id } })).billId, final.id);

    // A patient who pays everything once, at discharge (no deposits during the stay).
    const two = await ok('admit', { patient: { name: 'Ravi', age: 30 }, ward: 'Private Room', bedRate: 1500 });
    await ok('charge', { admissionId: two.id, items: [{ name: 'X-Ray Chest PA', category: 'X-Ray', unitPrice: 300 }] });
    const once = await ok('discharge', { admissionId: two.id, discountType: 'FLAT', discountValue: 300, payment: { amount: 1500, method: 'CARD' } });
    assert.strictEqual(once.totalAmount, 1500);
    assert.strictEqual(once.payments.length, 1);
    assert.strictEqual(once.paymentStatus, 'PAID');

    // One who leaves owing money.
    const three = await ok('admit', { patient: { name: 'Sohan', age: 50 }, bedRate: 500, deposit: { amount: 200 } });
    const owing = await ok('discharge', { admissionId: three.id });
    assert.strictEqual(owing.dueAmount, 300);
    assert.strictEqual(owing.paymentStatus, 'PARTIAL');

    // Owner report: IPD money counts once, on the days it was received.
    ctx.session = owner;
    const today = new Date().toLocaleDateString('en-CA');
    const s = (await api.callRoute(ctx, 'POST', 'owner/summary', { from: today, to: today })).json.data;
    assert.strictEqual(s.totals.paid, 2000 + 3000 - 1450 + 1500 + 200);
    assert.strictEqual(s.totals.ipdDeposits, s.totals.paid);
    assert.strictEqual(s.totals.due, 300);
    assert.strictEqual(s.inHospital.patients, 0);

    // Owner-only cancel of a mistaken admission (no money taken).
    const four = await ok('admit', { patient: { name: 'Mistake', age: 1 } });
    ctx.session = reception;
    assert.match((await call('cancel', { admissionId: four.id })).error, /owner/);
    ctx.session = owner;
    await ok('cancel', { admissionId: four.id });

    console.log('ipd: all checks passed');
  } finally {
    await prisma.$disconnect();
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
