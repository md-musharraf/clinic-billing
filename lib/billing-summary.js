// lib/billing-summary.js
// Owner dashboard maths, shared by the backend route, the billing screen and the test. Pure functions, no DB.

const CATEGORIES = ['Medicine', 'Lab Test', 'Doctor Fee', 'Ultrasound', 'X-Ray', 'Procedure', 'Room Charges', 'Ambulance', 'Miscellaneous'];

// The buckets the owner sees money split into.
const FEE_GROUPS = ['Lab Tests', 'Medicine', 'Doctor Fee', 'Ultrasound', 'X-Ray', 'Other'];
// Column headings where space is tight (tables, PDF).
/** @type {Record<string, string>} */
const SHORT = { 'Lab Tests': 'Lab', Medicine: 'Medicine', 'Doctor Fee': 'Dr. Fee', Ultrasound: 'USG', 'X-Ray': 'X-Ray', Other: 'Other' };
const GROUP_OF = { 'Lab Test': 'Lab Tests', Medicine: 'Medicine', 'Doctor Fee': 'Doctor Fee', Ultrasound: 'Ultrasound', 'X-Ray': 'X-Ray' };

// Category for an item typed at the counter that is not in the catalog.
function guessCategory(name, fallback = 'Medicine') {
  if (/ultrasound|\busg\b|sonograph/i.test(name)) return 'Ultrasound';
  if (/x[\s-]?ray/i.test(name)) return 'X-Ray';
  return fallback;
}

// The default catalog filed X-Ray and Ultrasound under "Lab Test", so those are split out by name.
function feeGroup(category, name = '') {
  const cat = category === 'Lab Test' ? guessCategory(name, category) : category;
  return GROUP_OF[cat] || 'Other';
}

const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const dayKey = (d) => new Date(d).toLocaleDateString('en-CA'); // local YYYY-MM-DD

// bills: in the period (an IPD discharge bill has .admission). deposits: IPD money received in the period; it is what
// counts as collected for admitted patients, on the day it came in, so their discharge bills add no "paid" of their own.
function summarize(bills, newPatients = 0, { deposits = [] } = {}) {
  const zero = () => Object.fromEntries(FEE_GROUPS.map((g) => [g, 0]));
  const groups = zero();
  const totals = { bills: bills.length, patients: 0, newPatients, gross: 0, discount: 0, gst: 0, net: 0, paid: 0, due: 0, ipdDeposits: 0 };
  const methods = {};
  const doctors = {};
  const days = {};
  const patients = new Set();
  const bump = (map, key, init) => (map[key] ||= init());

  const rows = bills.map((b) => {
    const g = zero();
    for (const it of b.items || []) g[feeGroup(it.itemCategory, it.itemName)] += Number(it.total) || 0;
    for (const k of FEE_GROUPS) groups[k] += g[k];

    totals.gross += b.subtotal;
    totals.discount += b.discountAmount;
    totals.gst += b.gstAmount;
    totals.net += b.totalAmount;
    totals.due += b.dueAmount;
    patients.add(b.patientId);

    if (!b.admission) {
      totals.paid += b.paidAmount;
      const m = bump(methods, b.paymentMethod || 'CASH', () => ({ bills: 0, amount: 0 }));
      m.bills += 1;
      m.amount += b.paidAmount;
    }

    const doc = bump(doctors, b.doctorName?.trim() || 'Self / Walk-in', () => ({ bills: 0, patients: new Set(), doctorFee: 0, total: 0 }));
    doc.bills += 1;
    doc.patients.add(b.patientId);
    doc.doctorFee += g['Doctor Fee'];
    doc.total += b.totalAmount;

    const day = bump(days, dayKey(b.createdAt), () => ({ bills: 0, patients: new Set(), total: 0 }));
    day.bills += 1;
    day.patients.add(b.patientId);
    day.total += b.totalAmount;

    return {
      id: b.id,
      billNo: b.billNo,
      date: b.createdAt,
      patientId: b.patientId,
      patientName: b.patientName,
      doctorName: b.doctorName || '',
      method: b.paymentMethod,
      ...Object.fromEntries(FEE_GROUPS.map((k) => [k, r2(g[k])])),
      gross: r2(b.subtotal),
      discount: r2(b.discountAmount),
      gst: r2(b.gstAmount),
      total: r2(b.totalAmount),
      paid: r2(b.paidAmount),
      due: r2(b.dueAmount),
    };
  });

  for (const d of deposits) {
    totals.paid += d.amount;
    totals.ipdDeposits += d.amount;
    const m = bump(methods, d.method || 'CASH', () => ({ bills: 0, amount: 0 }));
    m.bills += 1;
    m.amount += d.amount;
  }

  totals.patients = patients.size;
  for (const k of Object.keys(totals)) totals[k] = r2(totals[k]);
  const byAmount = (a, b) => b.total - a.total;

  return {
    totals,
    groups: FEE_GROUPS.map((name) => ({ name, amount: r2(groups[name]) })),
    methods: Object.entries(methods).map(([name, v]) => ({ name, bills: v.bills, amount: r2(v.amount) })),
    doctors: Object.entries(doctors)
      .map(([name, v]) => ({ name, bills: v.bills, patients: v.patients.size, doctorFee: r2(v.doctorFee), total: r2(v.total) }))
      .sort(byAmount),
    days: Object.entries(days)
      .map(([date, v]) => ({ date, bills: v.bills, patients: v.patients.size, total: r2(v.total) }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    rows,
  };
}

module.exports = { CATEGORIES, FEE_GROUPS, SHORT, guessCategory, feeGroup, summarize };
