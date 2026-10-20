"use client";

import { useEffect, useRef, useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { InvoiceModal } from '@/components/InvoiceModal';
import { db } from '@/lib/db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORIES, FEE_GROUPS, feeGroup, guessCategory } from '@/lib/billing-summary';
import { inputCls, btnPrimary, useToast, ToastView } from '@/components/kit';
import { Trash2, Save, Search, User, UserCheck, UserPlus, Plus, Minus, X, Receipt, Stethoscope } from 'lucide-react';

interface LineItem {
  key: number;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

type Patient = { id: string | null; name: string; mobile: string; age: number | ''; gender: string; visits?: number; lastVisit?: string };
const NEW_PATIENT: Patient = { id: null, name: '', mobile: '', age: '', gender: 'MALE' };

// One-tap buttons; price and category come from the catalog when the item is there.
const QUICK_ITEMS = [
  { name: 'General OPD Consultation', category: 'Doctor Fee', price: 300 },
  { name: 'CBC (Complete Blood Count)', category: 'Lab Test', price: 250 },
  { name: 'Blood Sugar (Fasting/PP)', category: 'Lab Test', price: 80 },
  { name: 'Ultrasound Abdomen', category: 'Ultrasound', price: 800 },
  { name: 'X-Ray Chest PA', category: 'X-Ray', price: 300 },
  { name: 'ECG (12 Lead)', category: 'Lab Test', price: 200 },
  { name: 'Paracetamol 650mg', category: 'Medicine', price: 8 },
  { name: 'Pantoprazole 40mg', category: 'Medicine', price: 12 },
  { name: 'Wound Dressing (Minor)', category: 'Procedure', price: 150 },
  { name: 'Specialist Consultation', category: 'Doctor Fee', price: 500 },
];
const PAY_MODES = ['CASH', 'UPI', 'CARD', 'BANK_TRANSFER'];
const label = 'mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground';
const cell = 'h-8 rounded-lg border border-border bg-background font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40';

// The counter screen: everything (patient, items, totals, save) fits the window; only the item list scrolls.
export default function BillingPage() {
  const [toast, showToast] = useToast();
  const [catalog, setCatalog] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [clinic, setClinic] = useState<any>(null);

  const [patient, setPatient] = useState<Patient>(NEW_PATIENT);
  const [patientQuery, setPatientQuery] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState<LineItem[]>([]);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [flashKey, setFlashKey] = useState<number | null>(null);
  const [focusPriceKey, setFocusPriceKey] = useState<number | null>(null);
  const nextKey = useRef(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  const [discountType, setDiscountType] = useState<'FLAT' | 'PERCENT'>('FLAT');
  const [discountValue, setDiscountValue] = useState<number | ''>('');
  const [taxPercent, setTaxPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [saving, setSaving] = useState(false);
  const [savedBill, setSavedBill] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      db.query('catalogItem', 'findMany', { where: { isActive: true }, orderBy: { name: 'asc' }, take: 2000 }),
      db.query('clinicSettings', 'findFirst', { where: { id: 1 } }),
      db.query('doctor', 'findMany', { where: { isActive: true }, orderBy: { name: 'asc' } }),
    ])
      .then(([cat, settings, docs]) => {
        setCatalog(cat || []);
        setClinic(settings);
        setDoctors(docs || []);
        if (settings?.doctorName) setDoctorName((d) => d || settings.doctorName);
      })
      .catch((e) => showToast(e.message || 'Could not load the catalog', 'error'));

    // "Bill" from the Patients screen opens here with ?patient=ID.
    const id = new URLSearchParams(location.search).get('patient');
    if (id) {
      db.query('patient', 'findFirst', {
        where: { id, deletedAt: null },
        include: { _count: { select: { bills: true } }, bills: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 } },
      })
        .then((p) => p && pickPatient(p))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Existing patients matching what is typed in name / mobile (only while it is a new patient).
  useEffect(() => {
    const q = patientQuery.trim();
    if (patient.id || q.length < 2) return setMatches([]);
    const t = setTimeout(async () => {
      try {
        const digits = q.replace(/\D/g, '');
        const found = await db.query('patient', 'findMany', {
          where: { deletedAt: null, OR: [{ name: { contains: q } }, { mobile: { contains: digits || q } }, { id: { contains: q.toUpperCase() } }] },
          orderBy: { registeredAt: 'desc' },
          take: 6,
          include: { _count: { select: { bills: true } }, bills: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 } },
        });
        setMatches(found || []);
        // A full mobile number that belongs to exactly one patient: take them straight away.
        if (digits.length >= 10 && found?.length === 1 && found[0].mobile?.endsWith(digits.slice(-10)) && !patient.name.trim()) pickPatient(found[0]);
      } catch {
        setMatches([]);
      }
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientQuery, patient.id]);

  const pickPatient = (p: any) => {
    setPatient({ id: p.id, name: p.name, mobile: p.mobile || '', age: p.age || '', gender: p.gender || 'MALE', visits: p._count?.bills ?? 0, lastVisit: p.bills?.[0]?.createdAt });
    if (p.referredDoctor) setDoctorName((d) => d || p.referredDoctor);
    setMatches([]);
    setShowMatches(false);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  const typePatient = (field: 'name' | 'mobile', value: string) => {
    setPatient((p) => ({ ...p, [field]: value }));
    setPatientQuery(value);
    setShowMatches(true);
  };

  const newPatient = () => {
    setPatient(NEW_PATIENT);
    setPatientQuery('');
    setTimeout(() => mobileRef.current?.focus(), 0);
  };

  // ---------- items ----------
  const findCatalog = (name: string) => catalog.find((c) => c.name.toLowerCase() === name.toLowerCase());
  const q = search.trim().toLowerCase();
  const results = q ? catalog.filter((c) => c.name.toLowerCase().includes(q) || c.code?.toLowerCase().includes(q)).slice(0, 8) : [];

  const updateLine = (key: number, patch: Partial<LineItem>) =>
    setItems((prev) => prev.map((it) => (it.key === key ? { ...it, ...patch, total: (patch.quantity ?? it.quantity) * (patch.unitPrice ?? it.unitPrice) } : it)));

  const addItem = (item: { name: string; category: string; price: number }) => {
    const existing = items.find((it) => it.name.toLowerCase() === item.name.toLowerCase());
    if (existing) {
      updateLine(existing.key, { quantity: existing.quantity + 1 });
      setFlashKey(existing.key);
    } else {
      const key = nextKey.current++;
      const price = Number(item.price || 0);
      setItems((prev) => [...prev, { key, name: item.name, category: item.category || 'Medicine', quantity: 1, unitPrice: price, total: price }]);
      setFlashKey(key);
      if (!price) setFocusPriceKey(key);
    }
    setSearch('');
    setActive(0);
    if (item.price) searchRef.current?.focus();
  };

  const addFromCatalog = (c: any) => addItem({ name: c.name, category: c.category, price: c.defaultPrice });
  const removeItem = (key: number) => setItems((prev) => prev.filter((it) => it.key !== key));

  // The newest line scrolls into view and flashes, so nothing hides below the fold.
  useEffect(() => {
    if (flashKey === null) return;
    document.getElementById(`line-${flashKey}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const t = setTimeout(() => setFlashKey(null), 900);
    return () => clearTimeout(t);
  }, [flashKey, items.length]);

  // A typed item has no price yet: put the cursor in its price box.
  useEffect(() => {
    if (focusPriceKey === null) return;
    const el = document.getElementById(`price-${focusPriceKey}`) as HTMLInputElement | null;
    el?.focus();
    el?.select();
    setFocusPriceKey(null);
  }, [focusPriceKey, items.length]);

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Escape') {
      setSearch('');
    } else if (e.key === 'Enter' && search.trim()) {
      e.preventDefault();
      const pick = results[active];
      if (pick) addFromCatalog(pick);
      else addItem({ name: search.trim(), category: guessCategory(search), price: 0 });
    }
  };

  // ---------- totals ----------
  const subtotal = items.reduce((sum, it) => sum + it.total, 0);
  const discountAmount =
    discountType === 'FLAT' ? Math.min(Number(discountValue || 0), subtotal) : (subtotal * Math.min(Number(discountValue || 0), 100)) / 100;
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (afterDiscount * taxPercent) / 100;
  const grandTotal = Math.round(afterDiscount + taxAmount);
  const groups = FEE_GROUPS.map((g) => ({ g, amount: items.filter((it) => feeGroup(it.category, it.name) === g).reduce((a, it) => a + it.total, 0) })).filter((x) => x.amount);

  const selectedDoctor = doctors.find((d) => d.name.toLowerCase() === doctorName.trim().toLowerCase());
  const hasDoctorFee = items.some((it) => it.category === 'Doctor Fee');

  const save = async () => {
    if (saving) return;
    if (!patient.name.trim()) {
      showToast('Enter the patient name, or pick an existing patient', 'error');
      return mobileRef.current?.focus();
    }
    if (!items.length) return showToast('Add at least one item', 'error');
    if (grandTotal <= 0) return showToast('The bill total is ₹0. Set the item prices first.', 'error');

    setSaving(true);
    try {
      // Patient and bill numbers are assigned by the backend.
      const pid =
        patient.id ||
        (
          await db.query('patient', 'create', {
            data: { name: patient.name.trim(), mobile: patient.mobile.trim(), age: Number(patient.age || 0), gender: patient.gender, referredDoctor: doctorName.trim() },
          })
        ).id;

      const bill = await db.query('bill', 'create', {
        data: {
          patientId: pid,
          patientName: patient.name.trim(),
          patientAge: Number(patient.age || 0),
          patientGender: patient.gender,
          patientMobile: patient.mobile.trim(),
          doctorName: doctorName.trim(),
          subtotal,
          discountType,
          discountValue: Number(discountValue || 0),
          discountAmount,
          gstPercent: taxPercent,
          gstAmount: taxAmount,
          totalAmount: grandTotal,
          paidAmount: grandTotal,
          dueAmount: 0,
          paymentMethod,
          paymentStatus: 'PAID',
          notes,
          items: { create: items.map((it) => ({ itemName: it.name, itemCategory: it.category, quantity: it.quantity, unitPrice: it.unitPrice, total: it.total })) },
        },
        include: { items: true },
      });

      // New items typed at the counter join the catalog for next time.
      const added: any[] = [];
      for (const it of items.filter((x) => !findCatalog(x.name))) {
        added.push(await db.query('catalogItem', 'create', { data: { name: it.name, category: it.category, defaultPrice: it.unitPrice, isCustom: true } }));
      }
      if (added.length) setCatalog((c) => [...c, ...added]);

      showToast(`Bill ${bill.billNo} saved`, 'success');
      setSavedBill(bill);
      setPatient(NEW_PATIENT);
      setPatientQuery('');
      setItems([]);
      setDiscountValue('');
      setTaxPercent(0);
      setPaymentMethod('CASH');
      setNotes('');
    } catch (e: any) {
      showToast(e.message || 'Failed to save bill', 'error');
    } finally {
      setSaving(false);
    }
  };

  // F9 saves from anywhere on the screen.
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F9' && !savedBill) {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [savedBill]);

  const closeInvoice = () => {
    setSavedBill(null);
    setTimeout(() => mobileRef.current?.focus(), 0);
  };

  const locked = !!patient.id;
  const lockedCls = locked ? 'bg-muted text-muted-foreground' : '';

  return (
    <AppLayout title="New Bill" subtitle="Patient, items and payment on one screen · F9 saves" fill>
      <ToastView toast={toast} />

      <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_340px] gap-4">
        {/* LEFT: patient, add items, item list */}
        <div className="flex min-h-0 flex-col gap-3">
          {/* Patient */}
          <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <User className="h-4 w-4 text-primary" /> Patient
              </h2>
              {locked ? (
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-600">
                    <UserCheck className="h-3.5 w-3.5" /> Returning · {patient.id}
                  </span>
                  <span className="text-muted-foreground">
                    {patient.visits} {patient.visits === 1 ? 'visit' : 'visits'}
                    {patient.lastVisit ? `, last ${formatDate(patient.lastVisit)}` : ''}
                  </span>
                  <button type="button" onClick={newPatient} className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-0.5 font-semibold hover:bg-muted cursor-pointer">
                    <X className="h-3 w-3" /> Change
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Type a mobile or name: old patients show up to pick</span>
              )}
            </div>

            <div className="relative grid grid-cols-12 gap-3">
              <div className="col-span-3">
                <label className={label} htmlFor="bill-mobile">Mobile</label>
                <input
                  id="bill-mobile"
                  ref={mobileRef}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="10 digits"
                  value={patient.mobile}
                  readOnly={locked}
                  onChange={(e) => typePatient('mobile', e.target.value)}
                  onFocus={() => setShowMatches(true)}
                  onBlur={() => setShowMatches(false)}
                  className={`${inputCls} h-10 ${lockedCls}`}
                  autoFocus
                />
              </div>
              <div className="col-span-4">
                <label className={label} htmlFor="bill-name">Name *</label>
                <input
                  id="bill-name"
                  autoComplete="off"
                  placeholder="Patient name"
                  value={patient.name}
                  readOnly={locked}
                  onChange={(e) => typePatient('name', e.target.value)}
                  onFocus={() => setShowMatches(true)}
                  onBlur={() => setShowMatches(false)}
                  className={`${inputCls} h-10 ${lockedCls}`}
                />
              </div>
              <div className="col-span-2">
                <label className={label} htmlFor="bill-age">Age</label>
                <input
                  id="bill-age"
                  type="number"
                  min="0"
                  placeholder="Yrs"
                  value={patient.age}
                  readOnly={locked}
                  onChange={(e) => setPatient({ ...patient, age: e.target.value ? Number(e.target.value) : '' })}
                  className={`${inputCls} h-10 ${lockedCls}`}
                />
              </div>
              <div className="col-span-3">
                <label className={label} htmlFor="bill-gender">Gender</label>
                <select id="bill-gender" value={patient.gender} disabled={locked} onChange={(e) => setPatient({ ...patient, gender: e.target.value })} className={`${inputCls} h-10 ${lockedCls}`}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {showMatches && !locked && matches.length > 0 && (
                <div className="absolute left-0 right-0 top-[4.25rem] z-40 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                  <p className="border-b border-border bg-muted/50 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">Existing patients · click to bill them</p>
                  {matches.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickPatient(m)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-primary/5 cursor-pointer"
                    >
                      <span className="min-w-0">
                        <span className="font-semibold">{m.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {m.age} {m.gender?.[0]} · {m.mobile || 'no mobile'}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        <span className="font-mono">{m.id}</span> · {m._count?.bills || 0} {m._count?.bills === 1 ? 'visit' : 'visits'}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowMatches(false)}
                    className="flex w-full items-center gap-2 border-t border-border px-3 py-2 text-left text-xs font-semibold text-primary hover:bg-primary/5 cursor-pointer"
                  >
                    <UserPlus className="h-3.5 w-3.5" /> None of these: bill as a new patient
                  </button>
                </div>
              )}

              <div className="col-span-7">
                <label className={label} htmlFor="bill-doctor">Doctor</label>
                <div className="flex gap-2">
                  <input id="bill-doctor" list="doctor-names" placeholder="Type or pick a doctor" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className={`${inputCls} h-10`} />
                  {selectedDoctor && !hasDoctorFee && (
                    <button
                      type="button"
                      onClick={() => addItem({ name: `Consultation - ${selectedDoctor.name}`, category: 'Doctor Fee', price: selectedDoctor.consultationFee })}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-primary/40 bg-primary/5 px-2.5 text-xs font-semibold text-primary hover:bg-primary/10 cursor-pointer"
                    >
                      <Stethoscope className="h-3.5 w-3.5" /> + Fee {formatCurrency(selectedDoctor.consultationFee)}
                    </button>
                  )}
                </div>
                <datalist id="doctor-names">
                  {doctors.map((d) => (
                    <option key={d.id} value={d.name}>{d.specialization || ''}</option>
                  ))}
                </datalist>
              </div>
              <div className="col-span-5">
                <label className={label} htmlFor="bill-note">Note / diagnosis</label>
                <input id="bill-note" placeholder="optional" value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputCls} h-10`} />
              </div>
            </div>
          </section>

          {/* Add items */}
          <section className="rounded-2xl border border-border bg-card p-3 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchRef}
                data-enter-native
                aria-label="Search items"
                autoComplete="off"
                placeholder="Add medicine, test, USG, X-Ray or fee… ↑↓ to choose, Enter to add"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActive(0);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                onKeyDown={onSearchKey}
                className={`${inputCls} h-10 pl-10`}
              />
              {searchOpen && search.trim() && (
                <div className="absolute left-0 right-0 top-11 z-40 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-2xl">
                  {results.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => addFromCatalog(r)}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm cursor-pointer ${i === active ? 'bg-primary/10' : ''}`}
                    >
                      <span>
                        <span className="font-semibold">{r.name}</span>
                        <span className="ml-2 text-[11px] text-muted-foreground">{r.category}</span>
                      </span>
                      <span className="font-mono font-bold text-primary">{formatCurrency(r.defaultPrice)}</span>
                    </button>
                  ))}
                  {!results.length && (
                    <p className="px-4 py-2 text-xs text-muted-foreground">
                      Not in the catalog. <b>Enter</b> adds “{search.trim()}” as {guessCategory(search)}, then type its price.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-2 flex max-h-[3.6rem] flex-wrap gap-1.5 overflow-hidden">
              {QUICK_ITEMS.map((qi) => {
                const c = findCatalog(qi.name);
                return (
                  <button
                    key={qi.name}
                    type="button"
                    onClick={() => (c ? addFromCatalog(c) : addItem(qi))}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium hover:border-primary/70 hover:bg-primary/5 hover:text-primary cursor-pointer"
                  >
                    {qi.name}
                    <span className="font-mono text-[10px] text-muted-foreground">{formatCurrency(c?.defaultPrice ?? qi.price)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Item list: the only part that scrolls */}
          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Items ({items.length}) · {formatCurrency(subtotal)}
              </span>
              {items.length > 0 && (
                <button type="button" onClick={() => setItems([])} className="text-xs text-destructive hover:underline cursor-pointer">
                  Clear all
                </button>
              )}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 z-10 bg-muted text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="w-8 px-3 py-2">#</th>
                    <th className="px-3 py-2">Item</th>
                    <th className="w-36 px-3 py-2">Type</th>
                    <th className="w-32 px-3 py-2 text-center">Qty</th>
                    <th className="w-28 px-3 py-2 text-right">Rate</th>
                    <th className="w-28 px-3 py-2 text-right">Amount</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {items.map((it, i) => (
                    <tr key={it.key} id={`line-${it.key}`} className={`transition-colors duration-700 ${flashKey === it.key ? 'bg-primary/15' : 'hover:bg-muted/30'}`}>
                      <td className="px-3 py-1.5 text-xs text-muted-foreground">{i + 1}</td>
                      <td className="px-3 py-1.5 font-medium">{it.name}</td>
                      <td className="px-3 py-1.5">
                        <select aria-label={`Type of ${it.name}`} value={it.category} onChange={(e) => updateLine(it.key, { category: e.target.value })} className={`${cell} w-full px-1.5 text-[11px]`}>
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="flex items-center justify-center gap-1">
                          <button type="button" aria-label={`One less ${it.name}`} onClick={() => it.quantity > 1 && updateLine(it.key, { quantity: it.quantity - 1 })} className="rounded-md p-1 hover:bg-muted cursor-pointer">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <input
                            aria-label={`Quantity of ${it.name}`}
                            type="number"
                            min="1"
                            value={it.quantity}
                            onChange={(e) => updateLine(it.key, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                            className={`${cell} w-12 text-center`}
                          />
                          <button type="button" aria-label={`One more ${it.name}`} onClick={() => updateLine(it.key, { quantity: it.quantity + 1 })} className="rounded-md p-1 hover:bg-muted cursor-pointer">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 text-right">
                        <input
                          id={`price-${it.key}`}
                          aria-label={`Rate of ${it.name}`}
                          type="number"
                          min="0"
                          value={it.unitPrice}
                          onChange={(e) => updateLine(it.key, { unitPrice: Math.max(0, parseFloat(e.target.value) || 0) })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              searchRef.current?.focus();
                            }
                          }}
                          className={`${cell} w-24 px-2 text-right ${it.unitPrice ? '' : 'border-amber-500 bg-amber-500/10'}`}
                        />
                      </td>
                      <td className="px-3 py-1.5 text-right font-bold tabular-nums">{formatCurrency(it.total)}</td>
                      <td className="px-2 py-1.5">
                        <button type="button" onClick={() => removeItem(it.key)} aria-label={`Remove ${it.name}`} className="rounded p-1 text-muted-foreground hover:text-destructive cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!items.length && (
                <div className="flex h-[calc(100%-2.25rem)] min-h-28 flex-col items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Receipt className="h-8 w-8 opacity-40" />
                  Search above or tap a one-tap button to add items.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT: summary, payment, save (always visible) */}
        <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bill summary</h2>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="truncate font-semibold">{patient.name || 'No patient yet'}</p>
              <p className="truncate text-xs text-muted-foreground">
                {[patient.age && `${patient.age} yrs`, patient.mobile, doctorName].filter(Boolean).join(' · ') || 'Mobile, age and doctor show here'}
              </p>
            </div>

            <div className="space-y-1">
              {groups.map(({ g, amount }) => (
                <div key={g} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{g}</span>
                  <span className="font-semibold tabular-nums">{formatCurrency(amount)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-1.5">
                <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                <span className="font-semibold tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                Discount
                <span className="inline-flex rounded-md border border-border bg-muted p-0.5 text-[11px]">
                  {(['FLAT', 'PERCENT'] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setDiscountType(t)} className={`rounded px-1.5 cursor-pointer ${discountType === t ? 'bg-primary font-bold text-primary-foreground' : ''}`}>
                      {t === 'FLAT' ? '₹' : '%'}
                    </button>
                  ))}
                </span>
              </span>
              <input
                aria-label="Discount"
                type="number"
                min="0"
                placeholder="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value ? Number(e.target.value) : '')}
                className={`${cell} w-24 px-2 text-right`}
              />
            </div>
            {discountAmount > 0 && <div className="-mt-2 text-right text-xs text-emerald-600">− {formatCurrency(discountAmount)}</div>}

            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">GST</span>
              <select aria-label="GST rate" value={taxPercent} onChange={(e) => setTaxPercent(Number(e.target.value))} className={`${cell} w-32 px-2`}>
                <option value={0}>0% (exempt)</option>
                <option value={5}>5%</option>
                <option value={12}>12%</option>
                <option value={18}>18%</option>
              </select>
            </div>
            {taxAmount > 0 && <div className="-mt-2 text-right text-xs text-muted-foreground">+ {formatCurrency(taxAmount)}</div>}

            <div>
              <span className="mb-1.5 block text-xs text-muted-foreground">Payment</span>
              <div className="grid grid-cols-2 gap-1.5">
                {PAY_MODES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`rounded-lg border py-1.5 text-xs font-semibold transition-colors cursor-pointer ${paymentMethod === m ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-muted'}`}
                  >
                    {m === 'BANK_TRANSFER' ? 'BANK' : m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-border bg-card p-4">
            <div className="flex items-end justify-between rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Total</span>
              <span className="font-mono text-3xl font-extrabold text-primary tabular-nums">{formatCurrency(grandTotal)}</span>
            </div>
            <button type="button" onClick={save} disabled={saving || !items.length} className={`w-full ${btnPrimary} h-12 text-base`}>
              <Save className="h-5 w-5" /> {saving ? 'Saving…' : 'Save & Print'}
              <kbd className="ml-1 border-white/30 bg-white/15 text-primary-foreground">F9</kbd>
            </button>
          </div>
        </aside>
      </div>

      {savedBill && <InvoiceModal bill={savedBill} clinicProfile={clinic} onClose={closeInvoice} />}
    </AppLayout>
  );
}
