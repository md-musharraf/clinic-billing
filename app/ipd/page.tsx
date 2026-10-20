"use client";

import { useEffect, useRef, useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ItemSearch, type PickedItem } from '@/components/ItemSearch';
import { InvoiceModal, PrintDialog, ReceiptSheet } from '@/components/InvoiceModal';
import { db, api, findPatients } from '@/lib/db';
import { buildBill } from '@/lib/ipd';
import { CATEGORIES } from '@/lib/billing-summary';
import { isAdmin } from '@/lib/roles';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import { inputCls, btnPrimary, btnGhost, btnDanger, Modal, Field, useLive, useToast, ToastView, useUser } from '@/components/kit';
import { BedDouble, Plus, Wallet, FileText, LogOut, Trash2, Pencil, Search, UserCheck, Printer, X } from 'lucide-react';

const PAY_MODES = ['CASH', 'UPI', 'CARD', 'BANK_TRANSFER'];
const DAY = 24 * 60 * 60 * 1000;
const mode = (m: string) => (m === 'BANK_TRANSFER' ? 'BANK' : m);
const sameDay = (a: any, b: any) => new Date(a).toDateString() === new Date(b).toDateString();
const WITH = { patient: true, charges: { orderBy: { chargedAt: 'asc' } }, deposits: { orderBy: { receivedAt: 'asc' } } };

function ModePicker({ value, onChange }: { value: string; onChange: (m: string) => void }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {PAY_MODES.map((m) => (
        <button key={m} type="button" onClick={() => onChange(m)} className={`rounded-lg border py-1.5 text-xs font-semibold cursor-pointer ${value === m ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-muted'}`}>
          {mode(m)}
        </button>
      ))}
    </div>
  );
}

// Same numbers as the final bill, before discharge (see buildBill in lib/ipd.js).
const runningBill = (a: any) => {
  const b = buildBill(a);
  return {
    provisional: true,
    billNo: a.admissionNo,
    createdAt: new Date().toISOString(),
    patientName: a.patient?.name,
    patientAge: a.patient?.age,
    patientGender: a.patient?.gender,
    patientMobile: a.patient?.mobile,
    doctorName: a.doctorName,
    subtotal: b.subtotal,
    discountAmount: 0,
    gstAmount: 0,
    gstPercent: 0,
    totalAmount: b.totalAmount,
    items: b.items,
    payments: a.deposits.map((d: any) => ({ amount: d.amount, method: d.method, reference: d.receiptNo, paidAt: d.receivedAt })),
    notes: `IPD ${a.admissionNo} · Admitted ${formatDateTime(a.admittedAt)} · Day ${b.days} · Running bill, not the final bill`,
  };
};

export default function AdmissionsPage() {
  const [toast, showToast] = useToast();
  const owner = isAdmin(useUser()?.role);
  const [tab, setTab] = useState<'ADMITTED' | 'DISCHARGED'>('ADMITTED');
  const [list, setList] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState('');
  const [catalog, setCatalog] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [clinic, setClinic] = useState<any>(null);

  const [admitting, setAdmitting] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [discharging, setDischarging] = useState(false);
  const [editing, setEditing] = useState(false);
  const [receipt, setReceipt] = useState<{ deposit: any; admission: any } | null>(null);
  const [printBill, setPrintBill] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [pricing, setPricing] = useState<PickedItem | null>(null); // a typed item waiting for its rate
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      db.query('catalogItem', 'findMany', { where: { isActive: true }, orderBy: { name: 'asc' }, take: 2000 }),
      db.query('doctor', 'findMany', { where: { isActive: true }, orderBy: { name: 'asc' } }),
      db.query('clinicSettings', 'findFirst', { where: { id: 1 } }),
    ])
      .then(([cat, docs, c]) => {
        setCatalog(cat || []);
        setDoctors(docs || []);
        setClinic(c);
      })
      .catch((e) => showToast(e.message, 'error'));
  }, [showToast]);

  useLive(async () => {
    try {
      const rows = await db.query('admission', 'findMany', {
        where: { status: tab },
        include: WITH,
        orderBy: tab === 'ADMITTED' ? { admittedAt: 'asc' } : { dischargedAt: 'desc' },
        take: tab === 'ADMITTED' ? 500 : 100,
      });
      setList(rows || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  }, ['admission'], [tab]);

  const q = filter.trim().toLowerCase();
  const shown = list.filter((a) => !q || a.patient?.name.toLowerCase().includes(q) || a.admissionNo.toLowerCase().includes(q) || (a.bedNo || '').toLowerCase().includes(q) || (a.patient?.mobile || '').includes(q));
  const sel = list.find((a) => a.id === selectedId) || shown[0] || null;
  const money = sel ? buildBill(sel) : null;

  // Every ipd/* call returns the fresh admission (or a bill); keep the list in step without a reload.
  const act = async (route: string, body: any, done?: string) => {
    const r = await api(`ipd/${route}`, body);
    if (!r?.success) {
      showToast(r?.error || 'Something went wrong', 'error');
      return null;
    }
    const a = r.data?.admission || r.data;
    if (a?.admissionNo) setList((l) => (l.some((x) => x.id === a.id) ? l.map((x) => (x.id === a.id ? a : x)) : [...l, a]));
    if (done) showToast(done);
    return r.data;
  };

  const addCharge = async (item: PickedItem, rate = item.price) => {
    if (!sel) return;
    if (!rate) return setPricing(item); // not in the catalog: ask for the rate first
    const ok = await act('charge', { admissionId: sel.id, items: [{ name: item.name, category: item.category, quantity: qty, unitPrice: rate }] });
    if (ok) {
      setQty(1);
      setPricing(null);
      searchRef.current?.focus();
    }
  };

  const dayOf = (a: any, t: any) => Math.floor((new Date(t).getTime() - new Date(a.admittedAt).getTime()) / DAY) + 1;
  const groups: { label: string; charges: any[] }[] = [];
  for (const c of sel?.charges || []) {
    const label = `Day ${dayOf(sel, c.chargedAt)} · ${formatDate(c.chargedAt)}`;
    const g = groups[groups.length - 1];
    if (g?.label === label) g.charges.push(c);
    else groups.push({ label, charges: [c] });
  }

  return (
    <AppLayout
      title="Admitted patients (IPD)"
      subtitle="Day-wise charges, deposits any time, running balance, one bill at discharge"
      fill
      actions={
        <button onClick={() => setAdmitting(true)} className={btnPrimary}>
          <Plus className="h-4 w-4" /> Admit patient
        </button>
      }
    >
      <ToastView toast={toast} />
      <div className="grid h-full min-h-0 grid-cols-[320px_minmax(0,1fr)] gap-4">
        {/* List */}
        <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="space-y-2 border-b border-border p-3">
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 text-xs font-semibold">
              {(['ADMITTED', 'DISCHARGED'] as const).map((t) => (
                <button key={t} onClick={() => { setTab(t); setSelectedId(null); }} className={`rounded-lg py-1.5 cursor-pointer ${tab === t ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}>
                  {t === 'ADMITTED' ? `In hospital${tab === t ? ` (${list.length})` : ''}` : 'Discharged'}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Name, mobile, IPD no, bed" className={`${inputCls} h-9 pl-9`} />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {shown.map((a) => {
              const b = buildBill(a);
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className={`mb-1.5 w-full rounded-xl border p-3 text-left transition-colors cursor-pointer ${sel?.id === a.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/40'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{a.patient?.name}</span>
                    {a.status === 'ADMITTED' ? (
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${b.due > 0 ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                        {b.due > 0 ? `Due ${formatCurrency(b.due)}` : `Adv ${formatCurrency(-b.due)}`}
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] text-muted-foreground">{formatDate(a.dischargedAt)}</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {a.admissionNo} · {a.ward ? `${a.ward.replace(/\s*\(.*\)$/, '')}${a.bedNo ? ` bed ${a.bedNo}` : ''}` : 'No bed'} · Day {b.days}
                  </p>
                </button>
              );
            })}
            {!shown.length && (
              <p className="p-6 text-center text-xs text-muted-foreground">
                {tab === 'ADMITTED' ? 'Nobody is admitted. Use “Admit patient”.' : 'No discharged patients yet.'}
              </p>
            )}
          </div>
        </aside>

        {/* Selected admission */}
        {sel && money ? (
          <section className="flex min-h-0 flex-col gap-3">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <BedDouble className="h-5 w-5 text-primary" /> {sel.patient?.name}
                    <span className="text-sm font-normal text-muted-foreground">{sel.patient?.age} {sel.patient?.gender?.[0]} · {sel.patient?.mobile || 'no mobile'}</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {sel.admissionNo} · admitted {formatDateTime(sel.admittedAt)}
                    {sel.dischargedAt ? ` · discharged ${formatDateTime(sel.dischargedAt)}` : ` · day ${money.days}`}
                    {sel.doctorName ? ` · ${sel.doctorName}` : ''}
                    {sel.ward ? ` · ${sel.ward}${sel.bedNo ? `, bed ${sel.bedNo}` : ''} @ ${formatCurrency(sel.bedRate)}/day` : ''}
                    {sel.notes ? ` · ${sel.notes}` : ''}
                  </p>
                </div>
                {sel.status === 'ADMITTED' ? (
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setEditing(true)} className={`${btnGhost} h-9`} title="Bed, doctor, notes"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setPrintBill(runningBill(sel))} className={`${btnGhost} h-9`}><FileText className="h-4 w-4" /> Running bill</button>
                    <button onClick={() => setDepositing(true)} className={`${btnGhost} h-9`}><Wallet className="h-4 w-4" /> Receive deposit</button>
                    <button onClick={() => setDischarging(true)} className={`${btnPrimary} h-9`}><LogOut className="h-4 w-4" /> Discharge</button>
                  </div>
                ) : (
                  sel.billId && (
                    <button
                      onClick={async () => setPrintBill(await db.query('bill', 'findUnique', { where: { id: sel.billId }, include: { items: true, payments: { orderBy: { paidAt: 'asc' } } } }))}
                      className={`${btnPrimary} h-9`}
                    >
                      <Printer className="h-4 w-4" /> Discharge bill
                    </button>
                  )
                )}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  ['Bill so far', formatCurrency(money.totalAmount), ''],
                  ['Deposited', formatCurrency(money.paid), ''],
                  [money.due > 0 ? 'Balance due' : 'Advance', formatCurrency(Math.abs(money.due)), money.due > 0 ? 'text-rose-600' : 'text-emerald-600'],
                  ['Bed', `${money.days} × ${formatCurrency(sel.bedRate)}`, ''],
                ].map(([k, v, cls]) => (
                  <div key={k} className="rounded-xl bg-muted/50 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className={`text-lg font-extrabold tabular-nums ${cls}`}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_260px] gap-3">
              {/* Charges, day by day */}
              <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {sel.status === 'ADMITTED' && (
                  <div className="flex gap-2 border-b border-border p-3">
                    <div className="min-w-0 flex-1">
                      <ItemSearch ref={searchRef} catalog={catalog} onAdd={(it) => addCharge(it)} placeholder="Add a charge: medicine, test, USG, X-Ray, visit… Enter adds" />
                    </div>
                    <div className="w-16 shrink-0">
                      <input aria-label="Quantity" type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className={`${inputCls} h-10 text-center`} title="Quantity for the next charge" />
                    </div>
                  </div>
                )}
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {sel.bedRate > 0 && (
                        <tr className="bg-primary/5 text-xs">
                          <td className="px-3 py-2" colSpan={3}>Bed charge, counted automatically: {money.days} {money.days === 1 ? 'day' : 'days'} × {formatCurrency(sel.bedRate)}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-right font-bold tabular-nums">{formatCurrency(money.days * sel.bedRate)}</td>
                          <td />
                        </tr>
                      )}
                      {groups.map((g) => (
                        <FragmentRows key={g.label} label={g.label} total={g.charges.reduce((s, c) => s + c.total, 0)}>
                          {g.charges.map((c) => (
                            <tr key={c.id} className="border-t border-border/50 hover:bg-muted/30">
                              <td className="w-16 whitespace-nowrap px-3 py-1.5 text-xs text-muted-foreground">{new Date(c.chargedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                              <td className="px-3 py-1.5 font-medium">{c.itemName} <span className="text-[11px] text-muted-foreground">{c.itemCategory}</span></td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-right text-xs text-muted-foreground tabular-nums">{c.quantity} × {formatCurrency(c.unitPrice)}</td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-right font-semibold tabular-nums">{formatCurrency(c.total)}</td>
                              <td className="w-10 px-2">
                                {sel.status === 'ADMITTED' && (owner || sameDay(c.chargedAt, new Date())) && (
                                  <button onClick={() => act('charge-delete', { chargeId: c.id })} aria-label={`Remove ${c.itemName}`} className="rounded p-1 text-muted-foreground hover:text-destructive cursor-pointer">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </FragmentRows>
                      ))}
                    </tbody>
                  </table>
                  {!sel.charges.length && <p className="p-6 text-center text-xs text-muted-foreground">No charges yet. Search above to add medicines, tests or visits as they happen.</p>}
                </div>
              </div>

              {/* Deposits */}
              <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <h3 className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Deposits ({sel.deposits.length})</h3>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  {sel.deposits.map((d: any) => (
                    <div key={d.id} className="flex items-center justify-between gap-2 border-b border-border/50 px-4 py-2 text-sm">
                      <div className="min-w-0">
                        <p className={`font-bold tabular-nums ${d.amount < 0 ? 'text-rose-600' : ''}`}>{d.amount < 0 ? 'Refund ' : ''}{formatCurrency(Math.abs(d.amount))}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{formatDateTime(d.receivedAt)} · {mode(d.method)} · {d.receiptNo}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button onClick={() => setReceipt({ deposit: d, admission: sel })} aria-label={`Print receipt ${d.receiptNo}`} className="rounded p-1 text-muted-foreground hover:text-primary cursor-pointer"><Printer className="h-3.5 w-3.5" /></button>
                        {owner && sel.status === 'ADMITTED' && (
                          <button onClick={() => confirm(`Delete deposit ${d.receiptNo}?`) && act('deposit-delete', { depositId: d.id }, 'Deposit deleted')} aria-label={`Delete ${d.receiptNo}`} className="rounded p-1 text-muted-foreground hover:text-destructive cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                        )}
                      </div>
                    </div>
                  ))}
                  {!sel.deposits.length && <p className="p-6 text-center text-xs text-muted-foreground">No deposit yet. A patient can also pay everything at discharge.</p>}
                </div>
                {owner && sel.status === 'ADMITTED' && !sel.deposits.length && (
                  <button
                    onClick={async () => confirm(`Cancel admission ${sel.admissionNo}? Its charges are removed.`) && (await act('cancel', { admissionId: sel.id }, 'Admission cancelled')) && setList((l) => l.filter((x) => x.id !== sel.id))}
                    className="border-t border-border px-4 py-2 text-left text-xs text-destructive hover:bg-destructive/5 cursor-pointer"
                  >
                    Cancel this admission (made by mistake)
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            {tab === 'ADMITTED' ? 'Admit a patient to start their IPD account.' : 'Pick a discharged patient to see their stay.'}
          </div>
        )}
      </div>

      {pricing && sel && (
        <RateDialog item={pricing} qty={qty} onClose={() => setPricing(null)} onSave={(rate, category) => addCharge({ ...pricing, category }, rate)} />
      )}
      {admitting && (
        <AdmitDialog
          catalog={catalog}
          doctors={doctors}
          defaultDoctor={clinic?.doctorName || ''}
          onClose={() => setAdmitting(false)}
          onSave={async (body) => {
            const a = await act('admit', body, 'Patient admitted');
            if (a) {
              setAdmitting(false);
              setTab('ADMITTED');
              setSelectedId(a.id);
              if (a.deposits?.[0]) setReceipt({ deposit: a.deposits[0], admission: a });
            }
          }}
        />
      )}
      {depositing && sel && (
        <DepositDialog
          due={money!.due}
          onClose={() => setDepositing(false)}
          onSave={async (body) => {
            const r = await act('deposit', { admissionId: sel.id, ...body }, 'Deposit saved');
            if (r) {
              setDepositing(false);
              setReceipt({ deposit: r.deposit, admission: r.admission });
            }
          }}
        />
      )}
      {discharging && sel && (
        <DischargeDialog
          admission={sel}
          onClose={() => setDischarging(false)}
          onSave={async (body) => {
            const bill = await act('discharge', { admissionId: sel.id, ...body }, 'Discharged. Final bill saved.');
            if (bill) {
              setDischarging(false);
              setList((l) => l.filter((x) => x.id !== sel.id));
              setPrintBill(bill);
            }
          }}
        />
      )}
      {editing && sel && (
        <EditDialog admission={sel} owner={owner} catalog={catalog} doctors={doctors} onClose={() => setEditing(false)} onSave={async (body) => (await act('update', { admissionId: sel.id, ...body }, 'Saved')) && setEditing(false)} />
      )}
      {receipt && (
        <PrintDialog title={`Receipt ${receipt.deposit.receiptNo}`} fileName={receipt.deposit.receiptNo} paper={clinic?.printPaperSize === 'Thermal80' ? 'Thermal80' : 'A5'} onClose={() => setReceipt(null)}>
          <ReceiptSheet deposit={receipt.deposit} admission={receipt.admission} clinic={clinic} billed={buildBill(receipt.admission).totalAmount} />
        </PrintDialog>
      )}
      {printBill && <InvoiceModal bill={printBill} clinicProfile={clinic} onClose={() => setPrintBill(null)} />}
    </AppLayout>
  );
}

function FragmentRows({ label, total, children }: { label: string; total: number; children: React.ReactNode }) {
  return (
    <>
      <tr className="sticky top-0 bg-muted text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        <td className="px-3 py-1.5" colSpan={3}>{label}</td>
        <td className="whitespace-nowrap px-3 py-1.5 text-right tabular-nums">{formatCurrency(total)}</td>
        <td />
      </tr>
      {children}
    </>
  );
}

function RateDialog({ item, qty, onClose, onSave }: { item: PickedItem; qty: number; onClose: () => void; onSave: (rate: number, category: string) => void }) {
  const [rate, setRate] = useState<number | ''>('');
  const [category, setCategory] = useState(item.category === 'Medicine' ? 'Miscellaneous' : item.category);
  return (
    <Modal title={`Rate for ${item.name}`} onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); if (Number(rate) > 0) onSave(Number(rate), category); }} className="space-y-4">
        <p className="text-xs text-muted-foreground">Not in the catalog, so it needs a price (quantity {qty}).</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Rate (₹)">
            <input type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')} className={inputCls} autoFocus required />
          </Field>
          <Field label="Type">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" className={btnPrimary}>Add charge</button>
        </div>
      </form>
    </Modal>
  );
}

// Bed types are the catalog's Room Charges (their price is the rate per 24 hours).
function RoomFields({ catalog, ward, bedRate, onChange, rateLocked }: { catalog: any[]; ward: string; bedRate: number | ''; onChange: (p: { ward?: string; bedRate?: number | '' }) => void; rateLocked?: boolean }) {
  const rooms = catalog.filter((c) => c.category === 'Room Charges');
  return (
    <>
      <Field label="Room / bed type">
        <select
          value={rooms.some((r) => r.name === ward) ? ward : ward ? '__other' : ''}
          onChange={(e) => {
            const r = rooms.find((x) => x.name === e.target.value);
            onChange(r ? { ward: r.name, ...(rateLocked ? {} : { bedRate: r.defaultPrice }) } : { ward: e.target.value === '__other' ? 'Room' : '' });
          }}
          className={inputCls}
        >
          <option value="">No bed charge</option>
          {rooms.map((r) => <option key={r.id} value={r.name}>{r.name} · {formatCurrency(r.defaultPrice)}</option>)}
          <option value="__other">Other…</option>
        </select>
      </Field>
      <Field label="Rate per day (₹)">
        <input type="number" min="0" value={bedRate} disabled={rateLocked} onChange={(e) => onChange({ bedRate: e.target.value ? Number(e.target.value) : '' })} className={inputCls} title={rateLocked ? 'Only the owner can change the bed rate' : ''} />
      </Field>
    </>
  );
}

function AdmitDialog({ catalog, doctors, defaultDoctor, onClose, onSave }: { catalog: any[]; doctors: any[]; defaultDoctor: string; onClose: () => void; onSave: (body: any) => void }) {
  const [q, setQ] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [picked, setPicked] = useState<any>(null);
  const [p, setP] = useState({ name: '', mobile: '', age: '' as number | '', gender: 'MALE' });
  const [f, setF] = useState({ doctorName: defaultDoctor, ward: '', bedNo: '', bedRate: '' as number | '', notes: '' });
  const [dep, setDep] = useState({ amount: '' as number | '', method: 'CASH', reference: '' });
  // The clinic's main doctor, once settings have loaded (unless someone already typed one).
  useEffect(() => {
    if (defaultDoctor) setF((x) => (x.doctorName ? x : { ...x, doctorName: defaultDoctor }));
  }, [defaultDoctor]);

  useEffect(() => {
    const term = q.trim();
    if (picked || term.length < 2) return setMatches([]);
    const t = setTimeout(() => findPatients(term).then(setMatches).catch(() => setMatches([])), 200);
    return () => clearTimeout(t);
  }, [q, picked]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      patient: picked ? { id: picked.id } : { ...p, age: Number(p.age || 0) },
      ...f,
      bedRate: Number(f.bedRate || 0),
      deposit: Number(dep.amount) > 0 ? { ...dep, amount: Number(dep.amount) } : undefined,
    });
  };

  return (
    <Modal title="Admit patient" onClose={onClose} wide>
      <form onSubmit={submit} className="grid grid-cols-2 gap-x-5 gap-y-3">
        <div className="col-span-2">
          {picked ? (
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">
              <span className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-emerald-600" /><b>{picked.name}</b> {picked.age} {picked.gender?.[0]} · {picked.mobile || 'no mobile'} · {picked.id}</span>
              <button type="button" onClick={() => setPicked(null)} className="inline-flex items-center gap-1 text-xs font-semibold hover:underline cursor-pointer"><X className="h-3 w-3" /> Change</button>
            </div>
          ) : (
            <Field label="Existing patient? Search name, mobile or ID">
              <div className="relative">
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Leave empty for a new patient" className={inputCls} autoFocus />
                {matches.length > 0 && (
                  <div className="absolute left-0 right-0 top-11 z-40 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                    {matches.map((m) => (
                      <button key={m.id} type="button" onClick={() => setPicked(m)} className="flex w-full justify-between px-3 py-2 text-left text-sm hover:bg-primary/5 cursor-pointer">
                        <span><b>{m.name}</b> <span className="text-xs text-muted-foreground">{m.age} {m.gender?.[0]} · {m.mobile || '—'}</span></span>
                        <span className="font-mono text-xs text-muted-foreground">{m.id}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>
          )}
        </div>
        {!picked && (
          <>
            <Field label="New patient name *"><input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} className={inputCls} required={!picked} /></Field>
            <Field label="Mobile"><input type="tel" value={p.mobile} onChange={(e) => setP({ ...p, mobile: e.target.value })} className={inputCls} /></Field>
            <Field label="Age"><input type="number" min="0" value={p.age} onChange={(e) => setP({ ...p, age: e.target.value ? Number(e.target.value) : '' })} className={inputCls} /></Field>
            <Field label="Gender">
              <select value={p.gender} onChange={(e) => setP({ ...p, gender: e.target.value })} className={inputCls}>
                <option value="MALE">Male</option><option value="FEMALE">Female</option><option value="OTHER">Other</option>
              </select>
            </Field>
          </>
        )}
        <RoomFields catalog={catalog} ward={f.ward} bedRate={f.bedRate} onChange={(x) => setF({ ...f, ...x })} />
        <Field label="Bed no."><input value={f.bedNo} onChange={(e) => setF({ ...f, bedNo: e.target.value })} placeholder="e.g. 4" className={inputCls} /></Field>
        <Field label="Doctor">
          <input list="ipd-doctors" value={f.doctorName} onChange={(e) => setF({ ...f, doctorName: e.target.value })} className={inputCls} />
          <datalist id="ipd-doctors">{doctors.map((d) => <option key={d.id} value={d.name} />)}</datalist>
        </Field>
        <Field label="Reason / diagnosis" className="col-span-2"><input value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="optional" className={inputCls} /></Field>
        <div className="col-span-2 rounded-xl border border-border bg-muted/30 p-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Advance deposit (optional, more can be taken any day)</p>
          <div className="grid grid-cols-[160px_1fr_160px] gap-2">
            <input aria-label="Advance amount" type="number" min="0" value={dep.amount} onChange={(e) => setDep({ ...dep, amount: e.target.value ? Number(e.target.value) : '' })} placeholder="₹ 0" className={inputCls} />
            <ModePicker value={dep.method} onChange={(method) => setDep({ ...dep, method })} />
            <input aria-label="Reference" value={dep.reference} onChange={(e) => setDep({ ...dep, reference: e.target.value })} placeholder="UPI / card ref" className={inputCls} />
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-2 border-t border-border pt-3">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" className={btnPrimary}>Admit</button>
        </div>
      </form>
    </Modal>
  );
}

function DepositDialog({ due, onClose, onSave }: { due: number; onClose: () => void; onSave: (body: any) => void }) {
  const [d, setD] = useState({ amount: (due > 0 ? due : '') as number | '', method: 'CASH', reference: '' });
  return (
    <Modal title="Receive deposit" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSave({ ...d, amount: Number(d.amount) }); }} className="space-y-4">
        <p className="text-sm text-muted-foreground">{due > 0 ? <>Balance due now: <b className="text-rose-600">{formatCurrency(due)}</b></> : <>Advance already covers the bill so far by <b className="text-emerald-600">{formatCurrency(-due)}</b>.</>}</p>
        <Field label="Amount (₹)"><input type="number" min="1" step="0.01" value={d.amount} onChange={(e) => setD({ ...d, amount: e.target.value ? Number(e.target.value) : '' })} className={inputCls} autoFocus required /></Field>
        <ModePicker value={d.method} onChange={(method) => setD({ ...d, method })} />
        <Field label="Reference (UPI / card)"><input value={d.reference} onChange={(e) => setD({ ...d, reference: e.target.value })} placeholder="optional" className={inputCls} /></Field>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" className={btnPrimary}><Wallet className="h-4 w-4" /> Save & print receipt</button>
        </div>
      </form>
    </Modal>
  );
}

function DischargeDialog({ admission, onClose, onSave }: { admission: any; onClose: () => void; onSave: (body: any) => void }) {
  const auto = buildBill(admission).days;
  const [days, setDays] = useState<number>(auto);
  const [discountType, setDiscountType] = useState<'FLAT' | 'PERCENT'>('FLAT');
  const [discountValue, setDiscountValue] = useState<number | ''>('');
  const [gstPercent, setGstPercent] = useState(0);
  const b = buildBill(admission, { days, discountType, discountValue: Number(discountValue || 0), gstPercent });
  const [amount, setAmount] = useState<number | ''>(b.due);
  const [method, setMethod] = useState('CASH');
  const [reference, setReference] = useState('');
  const touched = useRef(false);
  // Until someone types an amount, "collect now" follows the balance (refund when negative).
  useEffect(() => {
    if (!touched.current) setAmount(b.due);
  }, [b.due]);
  const left = Math.round((b.due - Number(amount || 0)) * 100) / 100;
  const row = (k: string, v: string, cls = '') => (
    <div className={`flex justify-between ${cls}`}><span className="text-muted-foreground">{k}</span><span className="font-semibold tabular-nums">{v}</span></div>
  );

  return (
    <Modal title={`Discharge ${admission.patient?.name}`} onClose={onClose} wide>
      <form onSubmit={(e) => { e.preventDefault(); onSave({ days, discountType, discountValue: Number(discountValue || 0), gstPercent, payment: Number(amount) ? { amount: Number(amount), method, reference } : undefined }); }} className="grid grid-cols-2 gap-6">
        <div className="space-y-3 text-sm">
          <Field label={`Bed days (counted: ${auto})`}>
            <input type="number" min="1" value={days} onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))} className={inputCls} />
          </Field>
          <div className="flex items-end gap-2">
            <Field label="Discount" className="flex-1">
              <input type="number" min="0" value={discountValue} onChange={(e) => setDiscountValue(e.target.value ? Number(e.target.value) : '')} placeholder="0" className={inputCls} />
            </Field>
            <div className="mb-0.5 inline-flex rounded-lg border border-border bg-muted p-0.5 text-xs">
              {(['FLAT', 'PERCENT'] as const).map((t) => (
                <button key={t} type="button" onClick={() => setDiscountType(t)} className={`rounded px-2 py-1.5 cursor-pointer ${discountType === t ? 'bg-primary font-bold text-primary-foreground' : ''}`}>{t === 'FLAT' ? '₹' : '%'}</button>
              ))}
            </div>
          </div>
          <Field label="GST">
            <select value={gstPercent} onChange={(e) => setGstPercent(Number(e.target.value))} className={inputCls}>
              <option value={0}>0% (exempt)</option><option value={5}>5%</option><option value={12}>12%</option><option value={18}>18%</option>
            </select>
          </Field>
          <div className="rounded-xl border border-border p-3">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">{b.due >= 0 ? 'Collect now' : 'Refund now (negative)'}</p>
            <input aria-label="Amount now" type="number" step="0.01" value={amount} onChange={(e) => { touched.current = true; setAmount(e.target.value === '' ? '' : Number(e.target.value)); }} className={`${inputCls} mb-2`} />
            <ModePicker value={method} onChange={setMethod} />
            <input aria-label="Reference" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="UPI / card ref (optional)" className={`${inputCls} mt-2`} />
          </div>
        </div>
        <div className="space-y-1.5 rounded-xl bg-muted/40 p-4 text-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Final bill</p>
          {b.items.map((it, i) => row(it.itemName, formatCurrency(it.total), i ? '' : 'text-primary'))}
          <div className="my-2 border-t border-border" />
          {row('Subtotal', formatCurrency(b.subtotal))}
          {b.discountAmount > 0 && row('Discount', `− ${formatCurrency(b.discountAmount)}`, 'text-emerald-600')}
          {b.gstAmount > 0 && row(`GST ${gstPercent}%`, `+ ${formatCurrency(b.gstAmount)}`)}
          {row('Total', formatCurrency(b.totalAmount), 'text-base')}
          {row(`Deposits (${admission.deposits.length})`, `− ${formatCurrency(b.paid)}`)}
          {row(b.due >= 0 ? 'Balance' : 'To refund', formatCurrency(Math.abs(b.due)), 'text-base')}
          {row('Now', formatCurrency(Number(amount || 0)))}
          <div className={`mt-2 rounded-lg px-3 py-2 text-center font-bold ${left > 0 ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
            {left > 0 ? `${formatCurrency(left)} stays due on the bill` : left < 0 ? 'More than the balance' : 'Fully settled'}
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-2 border-t border-border pt-3">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" disabled={left < 0} className={btnDanger}><LogOut className="h-4 w-4" /> Discharge & make final bill</button>
        </div>
      </form>
    </Modal>
  );
}

function EditDialog({ admission, owner, catalog, doctors, onClose, onSave }: { admission: any; owner: boolean; catalog: any[]; doctors: any[]; onClose: () => void; onSave: (body: any) => void }) {
  const [f, setF] = useState({ ward: admission.ward || '', bedNo: admission.bedNo || '', bedRate: admission.bedRate as number | '', doctorName: admission.doctorName || '', notes: admission.notes || '' });
  return (
    <Modal title={`Edit ${admission.admissionNo}`} onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSave({ ...f, bedRate: Number(f.bedRate || 0) }); }} className="grid grid-cols-2 gap-3">
        <RoomFields catalog={catalog} ward={f.ward} bedRate={f.bedRate} onChange={(x) => setF({ ...f, ...x })} rateLocked={!owner} />
        <Field label="Bed no."><input value={f.bedNo} onChange={(e) => setF({ ...f, bedNo: e.target.value })} className={inputCls} /></Field>
        <Field label="Doctor">
          <input list="ipd-doctors-edit" value={f.doctorName} onChange={(e) => setF({ ...f, doctorName: e.target.value })} className={inputCls} />
          <datalist id="ipd-doctors-edit">{doctors.map((d) => <option key={d.id} value={d.name} />)}</datalist>
        </Field>
        <Field label="Reason / diagnosis" className="col-span-2"><input value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} className={inputCls} /></Field>
        <p className="col-span-2 text-[11px] text-muted-foreground">The bed rate applies to the whole stay. For a move to another room, add the other room's days as a charge.</p>
        <div className="col-span-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" className={btnPrimary}>Save</button>
        </div>
      </form>
    </Modal>
  );
}
