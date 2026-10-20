// lib/ipd.js
// Admitted patients (IPD): admit, day-wise charges, deposits (any number), running balance, discharge into one Bill.
// The maths at the top is shared by the screen (running bill, discharge preview) and the backend (the real bill).

const { isAdmin } = require('./roles');

const DAY = 24 * 60 * 60 * 1000;
const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const localDay = (d) => new Date(d).toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

// Bed days: every started 24 hours counts, at least one.
function bedDays(admittedAt, until = new Date()) {
  return Math.max(1, Math.ceil((new Date(until).getTime() - new Date(admittedAt).getTime()) / DAY));
}

// The bill an admission adds up to (admission loaded with charges + deposits). Same numbers for the running bill
// on screen and the final bill at discharge.
/** @param {any} adm @param {{ days?: number, discountType?: string, discountValue?: number, gstPercent?: number }} [opts] */
function buildBill(adm, { days, discountType = 'FLAT', discountValue = 0, gstPercent = 0 } = {}) {
  const d = days || bedDays(adm.admittedAt, adm.dischargedAt || new Date());
  const items = [...adm.charges]
    .sort((a, b) => new Date(a.chargedAt) - new Date(b.chargedAt))
    .map((c) => ({ itemName: c.itemName, itemCategory: c.itemCategory, quantity: c.quantity, unitPrice: c.unitPrice, total: r2(c.total), createdAt: c.chargedAt }));
  if (adm.bedRate > 0) {
    items.unshift({
      itemName: `${adm.ward || 'Bed charge'}${adm.bedNo ? ` · Bed ${adm.bedNo}` : ''} (${d} ${d === 1 ? 'day' : 'days'})`,
      itemCategory: 'Room Charges',
      quantity: d,
      unitPrice: adm.bedRate,
      total: r2(d * adm.bedRate),
      createdAt: adm.admittedAt,
    });
  }
  const subtotal = r2(items.reduce((a, it) => a + it.total, 0));
  const value = Math.max(0, Number(discountValue) || 0);
  const discountAmount = r2(discountType === 'PERCENT' ? (subtotal * Math.min(value, 100)) / 100 : Math.min(value, subtotal));
  const gstAmount = r2(((subtotal - discountAmount) * (Number(gstPercent) || 0)) / 100);
  const totalAmount = Math.round(subtotal - discountAmount + gstAmount);
  const paid = r2(adm.deposits.reduce((a, x) => a + x.amount, 0));
  return {
    days: d,
    items,
    subtotal,
    discountType,
    discountValue: value,
    discountAmount,
    gstPercent: Number(gstPercent) || 0,
    gstAmount,
    totalAmount,
    paid,
    due: r2(totalAmount - paid), // negative = money to give back
  };
}

const fmt = (d) => new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// ---------- backend ----------
class IpdError extends Error {}
const money = (v, what) => {
  const n = Number(v);
  if (!Number.isFinite(n)) throw new IpdError(`${what} must be a number.`);
  return r2(n);
};
const WITH = { patient: true, charges: true, deposits: { orderBy: { receivedAt: 'asc' } } };

// user = signed-in session; nextNumber(table, field, prefix, digits) from server-api.
async function route(prisma, user, name, b, { nextNumber }) {
  const today = () => new Date().toLocaleDateString('en-CA').replace(/-/g, '');
  const open = async (tx, id) => {
    const adm = await tx.admission.findUnique({ where: { id: Number(id) }, include: WITH });
    if (!adm) throw new IpdError('Admission not found.');
    if (adm.status !== 'ADMITTED') throw new IpdError(`${adm.admissionNo} is already discharged.`);
    return adm;
  };
  const deposit = (tx, admissionId, amount, method, reference) =>
    nextNumber(tx.admissionDeposit, 'receiptNo', `RCPT-${today()}-`, 4).then((receiptNo) =>
      tx.admissionDeposit.create({ data: { admissionId, receiptNo, amount, method: method || 'CASH', reference: reference || null, receivedBy: user.id } }),
    );

  if (name === 'admit') {
    return prisma.$transaction(async (tx) => {
      let patientId = b.patient?.id;
      if (patientId) {
        const p = await tx.patient.findFirst({ where: { id: patientId, deletedAt: null } });
        if (!p) throw new IpdError('Patient not found.');
        const already = await tx.admission.findFirst({ where: { patientId, status: 'ADMITTED' } });
        if (already) throw new IpdError(`${p.name} is already admitted (${already.admissionNo}).`);
      } else {
        const p = b.patient || {};
        if (!String(p.name || '').trim()) throw new IpdError('Patient name is required.');
        patientId = await nextNumber(tx.patient, 'id', `MED-${new Date().getFullYear()}-`, 5);
        await tx.patient.create({
            data: {
              id: patientId,
              uhid: patientId,
              name: String(p.name).trim(),
              mobile: String(p.mobile || '').trim(),
              age: Number(p.age) || 0,
              gender: p.gender || 'MALE',
              referredDoctor: b.doctorName || null,
            },
          });
      }
      const bedRate = money(b.bedRate || 0, 'Bed rate');
      if (bedRate < 0) throw new IpdError('Bed rate cannot be negative.');
      const adm = await tx.admission.create({
        data: {
          admissionNo: await nextNumber(tx.admission, 'admissionNo', `IPD-${new Date().getFullYear()}-`, 4),
          patientId,
          doctorName: b.doctorName || null,
          ward: b.ward || null,
          bedNo: b.bedNo || null,
          bedRate,
          notes: b.notes || null,
          createdBy: user.id,
        },
      });
      const first = b.deposit && money(b.deposit.amount || 0, 'Deposit');
      if (first > 0) await deposit(tx, adm.id, first, b.deposit.method, b.deposit.reference);
      return tx.admission.findUnique({ where: { id: adm.id }, include: WITH });
    });
  }

  if (name === 'charge') {
    const items = (b.items || []).map((it) => ({
      itemName: String(it.name || '').trim(),
      itemCategory: it.category || 'Medicine',
      quantity: Math.max(1, parseInt(it.quantity, 10) || 1),
      unitPrice: money(it.unitPrice, 'Rate'),
    }));
    if (!items.length || items.some((it) => !it.itemName || it.unitPrice < 0)) throw new IpdError('Each charge needs a name and a rate.');
    return prisma.$transaction(async (tx) => {
      const adm = await open(tx, b.admissionId);
      for (const it of items) await tx.admissionCharge.create({ data: { ...it, total: r2(it.quantity * it.unitPrice), admissionId: adm.id, createdBy: user.id } });
      return tx.admission.findUnique({ where: { id: adm.id }, include: WITH });
    });
  }

  if (name === 'charge-delete') {
    return prisma.$transaction(async (tx) => {
      const c = await tx.admissionCharge.findUnique({ where: { id: Number(b.chargeId) } });
      if (!c) throw new IpdError('Charge not found.');
      await open(tx, c.admissionId);
      // Reception can take back a charge added by mistake today; older ones only the owner.
      if (!isAdmin(user.role) && localDay(c.chargedAt) !== localDay(new Date())) throw new IpdError('Only the owner can remove a charge from an earlier day.');
      await tx.admissionCharge.delete({ where: { id: c.id } });
      return tx.admission.findUnique({ where: { id: c.admissionId }, include: WITH });
    });
  }

  if (name === 'deposit') {
    const amount = money(b.amount, 'Amount');
    if (amount <= 0) throw new IpdError('Enter the amount received.');
    return prisma.$transaction(async (tx) => {
      const adm = await open(tx, b.admissionId);
      const dep = await deposit(tx, adm.id, amount, b.method, b.reference);
      return { deposit: dep, admission: await tx.admission.findUnique({ where: { id: adm.id }, include: WITH }) };
    });
  }

  if (name === 'deposit-delete') {
    if (!isAdmin(user.role)) throw new IpdError('Only the owner can delete a deposit.');
    return prisma.$transaction(async (tx) => {
      const d = await tx.admissionDeposit.findUnique({ where: { id: Number(b.depositId) } });
      if (!d) throw new IpdError('Deposit not found.');
      await open(tx, d.admissionId);
      await tx.admissionDeposit.delete({ where: { id: d.id } });
      return tx.admission.findUnique({ where: { id: d.admissionId }, include: WITH });
    });
  }

  if (name === 'update') {
    return prisma.$transaction(async (tx) => {
      const adm = await open(tx, b.admissionId);
      const data = {};
      for (const k of ['doctorName', 'ward', 'bedNo', 'notes']) if (typeof b[k] === 'string') data[k] = b[k].trim() || null;
      if (b.bedRate !== undefined && money(b.bedRate, 'Bed rate') !== adm.bedRate) {
        if (!isAdmin(user.role)) throw new IpdError('Only the owner can change the bed rate.');
        data.bedRate = Math.max(0, money(b.bedRate, 'Bed rate'));
      }
      return tx.admission.update({ where: { id: adm.id }, data, include: WITH });
    });
  }

  // Owner only: an admission made by mistake, before any money was taken.
  if (name === 'cancel') {
    if (!isAdmin(user.role)) throw new IpdError('Only the owner can cancel an admission.');
    return prisma.$transaction(async (tx) => {
      const adm = await open(tx, b.admissionId);
      if (adm.deposits.length) throw new IpdError('Delete its deposits first (or discharge with a refund).');
      await tx.admission.delete({ where: { id: adm.id } });
      return { success: true };
    });
  }

  // One bill for the whole stay: every charge (dated), the bed days, discount/GST, every deposit as a payment,
  // and what is collected (or refunded, negative) now.
  if (name === 'discharge') {
    return prisma.$transaction(async (tx) => {
      const adm = await open(tx, b.admissionId);
      const days = b.days ? Math.max(1, parseInt(b.days, 10) || 1) : undefined;
      const now = new Date();
      const pre = buildBill({ ...adm, dischargedAt: now }, { days, discountType: b.discountType, discountValue: b.discountValue, gstPercent: b.gstPercent });
      const settle = b.payment ? money(b.payment.amount || 0, 'Amount') : 0;
      if (pre.paid + settle > pre.totalAmount + 0.001) throw new IpdError('That is more than the bill. Enter at most the balance, or a refund as a negative amount.');
      if (pre.paid + settle < 0) throw new IpdError('Refund is more than what was deposited.');
      if (settle) await deposit(tx, adm.id, settle, b.payment.method, b.payment.reference);
      const deposits = await tx.admissionDeposit.findMany({ where: { admissionId: adm.id }, orderBy: { receivedAt: 'asc' } });
      const paid = r2(deposits.reduce((a, x) => a + x.amount, 0));
      const due = r2(pre.totalAmount - paid);
      const settings = await tx.clinicSettings.findFirst();
      const p = adm.patient;

      const bill = await tx.bill.create({
        data: {
          billNo: await nextNumber(tx.bill, 'billNo', `MED-BIL-${today()}-`, 4),
          patientId: p.id,
          patientName: p.name,
          patientAge: p.age,
          patientGender: p.gender,
          patientMobile: p.mobile,
          doctorName: adm.doctorName,
          subtotal: pre.subtotal,
          discountType: pre.discountType,
          discountValue: pre.discountValue,
          discountAmount: pre.discountAmount,
          gstPercent: pre.gstPercent,
          gstAmount: pre.gstAmount,
          totalAmount: pre.totalAmount,
          paidAmount: paid,
          dueAmount: Math.max(0, due),
          paymentMethod: (settle ? b.payment.method : deposits[deposits.length - 1]?.method) || 'CASH',
          paymentStatus: due > 0 ? (paid > 0 ? 'PARTIAL' : 'UNPAID') : 'PAID',
          notes: [
            `IPD ${adm.admissionNo}`,
            `Admitted ${fmt(adm.admittedAt)}`,
            `Discharged ${fmt(now)}`,
            `${pre.days} ${pre.days === 1 ? 'day' : 'days'}`,
            adm.notes,
          ].filter(Boolean).join(' · '),
          clinicSnapshot: settings ? JSON.stringify({ clinicName: settings.clinicName, address: settings.address, phone: settings.phone, gstin: settings.gstin }) : null,
          createdBy: user.id,
          items: { create: pre.items },
          payments: { create: deposits.map((d) => ({ amount: d.amount, method: d.method, reference: d.reference || d.receiptNo, receivedBy: d.receivedBy, paidAt: d.receivedAt })) },
        },
        include: { items: true, payments: { orderBy: { paidAt: 'asc' } } },
      });
      await tx.admission.update({ where: { id: adm.id }, data: { status: 'DISCHARGED', dischargedAt: now, billId: bill.id } });
      return bill;
    });
  }

  throw new IpdError(`Unknown admission action: ${name}`);
}

module.exports = { bedDays, buildBill, route, IpdError };
