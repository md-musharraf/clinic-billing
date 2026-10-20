// Run: npm test
const assert = require('assert');
const { feeGroup, guessCategory, summarize } = require('../lib/billing-summary');
const { homeFor, canOpen } = require('../lib/roles');

assert.strictEqual(feeGroup('Lab Test', 'CBC'), 'Lab Tests');
assert.strictEqual(feeGroup('Lab Test', 'X-Ray Chest PA'), 'X-Ray');
assert.strictEqual(feeGroup('Lab Test', 'Ultrasound Abdomen'), 'Ultrasound');
assert.strictEqual(feeGroup('Medicine', 'Ultrasound gel'), 'Medicine');
assert.strictEqual(feeGroup('Room Charges', 'General Ward'), 'Other');
assert.strictEqual(guessCategory('USG Whole Abdomen'), 'Ultrasound');
assert.strictEqual(guessCategory('xray knee'), 'X-Ray');
assert.strictEqual(guessCategory('Paracetamol'), 'Medicine');

const bill = (id, patientId, doctorName, items, extra = {}) => {
  const subtotal = items.reduce((s, [, , total]) => s + total, 0);
  return {
    id, billNo: `B${id}`, patientId, patientName: patientId, doctorName, paymentMethod: 'CASH',
    createdAt: new Date(2026, 9, 20, 10), subtotal, discountAmount: 0, gstAmount: 0,
    totalAmount: subtotal, paidAmount: subtotal, dueAmount: 0,
    items: items.map(([itemCategory, itemName, total]) => ({ itemCategory, itemName, total })),
    ...extra,
  };
};

const s = summarize([
  bill(1, 'P1', 'Dr. A', [['Doctor Fee', 'OPD', 300], ['Lab Test', 'CBC', 250], ['Medicine', 'Para', 80.1]]),
  bill(2, 'P1', 'Dr. A', [['Lab Test', 'X-Ray Chest PA', 300], ['Ultrasound', 'USG Pelvis', 900]],
    { discountAmount: 200, totalAmount: 1000, paidAmount: 600, dueAmount: 400, paymentMethod: 'UPI' }),
  bill(3, 'P2', '', [['Procedure', 'Dressing', 150]]),
], 1);

const g = Object.fromEntries(s.groups.map((x) => [x.name, x.amount]));
assert.deepStrictEqual(g, { 'Lab Tests': 250, Medicine: 80.1, 'Doctor Fee': 300, Ultrasound: 900, 'X-Ray': 300, Other: 150 });
assert.strictEqual(s.totals.bills, 3);
assert.strictEqual(s.totals.patients, 2);
assert.strictEqual(s.totals.gross, 1980.1);
assert.strictEqual(s.totals.discount, 200);
assert.strictEqual(s.totals.net, 1780.1);
assert.strictEqual(s.totals.paid, 1380.1);
assert.strictEqual(s.totals.due, 400);
assert.strictEqual(s.groups.reduce((a, x) => a + x.amount, 0).toFixed(2), s.totals.gross.toFixed(2));
assert.deepStrictEqual(s.methods.find((m) => m.name === 'UPI'), { name: 'UPI', bills: 1, amount: 600 });
assert.deepStrictEqual(s.doctors[0], { name: 'Dr. A', bills: 2, patients: 1, doctorFee: 300, total: 1630.1 });
assert.strictEqual(s.doctors[1].name, 'Self / Walk-in');
assert.deepStrictEqual(s.days, [{ date: '2026-10-20', bills: 3, patients: 2, total: 1780.1 }]);
assert.strictEqual(s.rows[1]['X-Ray'], 300);

assert.strictEqual(homeFor('SUPER_ADMIN'), '/owner');
assert.strictEqual(homeFor('RECEPTIONIST'), '/dashboard');
assert.strictEqual(canOpen('RECEPTIONIST', '/owner'), false);
assert.strictEqual(canOpen('ADMIN', '/owner'), true);

console.log('billing-summary: all checks passed');
