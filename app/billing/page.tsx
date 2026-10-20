"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { CATEGORIES, guessCategory } from '@/lib/billing-summary';
import { Trash2, Save, Search, User, UserCheck, Stethoscope, Plus } from 'lucide-react';
import { inputCls, labelCls, btnPrimary, th, td, useToast, ToastView } from '@/components/kit';
import { InvoiceModal } from '@/components/InvoiceModal';

// One-tap buttons; price and category come from the catalog when the item is there.
const QUICK_ITEMS = [
  { name: 'General OPD Consultation', category: 'Doctor Fee', price: 300 },
  { name: 'Specialist Consultation', category: 'Doctor Fee', price: 500 },
  { name: 'CBC (Complete Blood Count)', category: 'Lab Test', price: 250 },
  { name: 'Blood Sugar (Fasting/PP)', category: 'Lab Test', price: 80 },
  { name: 'Ultrasound Abdomen', category: 'Ultrasound', price: 800 },
  { name: 'X-Ray Chest PA', category: 'X-Ray', price: 300 },
  { name: 'ECG (12 Lead)', category: 'Lab Test', price: 200 },
  { name: 'Paracetamol 650mg', category: 'Medicine', price: 8 },
  { name: 'Pantoprazole 40mg', category: 'Medicine', price: 12 },
  { name: 'Wound Dressing (Minor)', category: 'Procedure', price: 150 },
];

interface LineItem {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isCustom?: boolean;
}

export default function BillingPage() {
  const [toast, showToast] = useToast();

  // Patient Details
  const [patientId, setPatientId] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientMobile, setPatientMobile] = useState('');
  const [patientAge, setPatientAge] = useState<number | ''>('');
  const [patientGender, setPatientGender] = useState('MALE');
  const [doctorName, setDoctorName] = useState('');
  const [matches, setMatches] = useState<any[]>([]); // existing patients with the typed mobile
  const [doctorsList, setDoctorsList] = useState<any[]>([]);

  // Item Search & Catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogItems, setCatalogItems] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Billing Line Items
  const [items, setItems] = useState<LineItem[]>([]);

  // Pricing & Tax
  const [discountType, setDiscountType] = useState<'FLAT' | 'PERCENT'>('FLAT');
  const [discountValue, setDiscountValue] = useState<number | ''>(0);
  const [taxPercent, setTaxPercent] = useState<number | ''>(0);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [notes, setNotes] = useState('');

  // Invoice & Print Modal
  const [savedBill, setSavedBill] = useState<any | null>(null);
  const [clinicProfile, setClinicProfile] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveToCatalog, setSaveToCatalog] = useState(true);

  // Load Catalog, Clinic Settings & Doctors
  useEffect(() => {
    async function loadInitial() {
      try {
        const cat = await db.query('catalogItem', 'findMany', {
          where: { isActive: true },
          take: 500,
        });
        setCatalogItems(cat || []);

        const settings = await db.query('clinicSettings', 'findFirst', { where: { id: 1 } });
        if (settings) {
          setClinicProfile(settings);
          if (settings.doctorName) setDoctorName(settings.doctorName);
        }

        const docs = await db.query('doctor', 'findMany', { where: { isActive: true } });
        setDoctorsList(docs || []);
      } catch (e) {
        console.warn('Initial load error:', e);
      }
    }
    loadInitial();
  }, []);

  // Filter Search Results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = catalogItems.filter(
      (it) => it.name.toLowerCase().includes(q) || it.code?.toLowerCase().includes(q)
    );
    setSearchResults(filtered.slice(0, 10));
    setShowDropdown(true);
  }, [searchQuery, catalogItems]);

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + it.total, 0);

  const discountAmount =
    discountType === 'FLAT'
      ? Math.min(Number(discountValue || 0), subtotal)
      : (subtotal * Math.min(Number(discountValue || 0), 100)) / 100;

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (afterDiscount * Number(taxPercent || 0)) / 100;
  const grandTotal = Math.round(afterDiscount + taxAmount);

  const findCatalog = (name: string) => catalogItems.find((c) => c.name.toLowerCase() === name.toLowerCase());

  // Same item again = one more of it.
  const addItem = (item: { name: string; category: string; price: number }) => {
    const i = items.findIndex((it) => it.name.toLowerCase() === item.name.toLowerCase());
    if (i > -1) updateLine(i, { quantity: items[i].quantity + 1 });
    else {
      const price = Number(item.price || 0);
      setItems([...items, { name: item.name, category: item.category || 'Medicine', quantity: 1, unitPrice: price, total: price }]);
    }
    setSearchQuery('');
    setShowDropdown(false);
  };

  const addQuick = (q: (typeof QUICK_ITEMS)[number]) => {
    const c = findCatalog(q.name);
    addItem(c ? { name: c.name, category: c.category, price: c.defaultPrice } : q);
  };

  const updateLine = (index: number, patch: Partial<LineItem>) =>
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        const next = { ...it, ...patch };
        return { ...next, total: next.quantity * next.unitPrice };
      }),
    );

  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  // Returning patient: same mobile number → pick them instead of making a duplicate record.
  const lookupMobile = async (mobile: string) => {
    setPatientMobile(mobile);
    setPatientId(null);
    const digits = mobile.replace(/\D/g, '');
    if (digits.length < 10) return setMatches([]);
    try {
      const found = await db.query('patient', 'findMany', {
        where: { mobile: { contains: digits.slice(-10) }, deletedAt: null },
        orderBy: { registeredAt: 'desc' },
        take: 5,
      });
      setMatches(found || []);
      if (found?.length === 1 && !patientName.trim()) pickPatient(found[0]);
    } catch {
      setMatches([]);
    }
  };

  const pickPatient = (p: any) => {
    setPatientId(p.id);
    setPatientName(p.name);
    setPatientAge(p.age || '');
    setPatientGender(p.gender || 'MALE');
  };

  const selectedDoctor = doctorsList.find((d) => d.name.toLowerCase() === doctorName.trim().toLowerCase());
  const hasDoctorFee = items.some((it) => it.category === 'Doctor Fee');

  const handleSaveBill = async () => {
    if (!patientName.trim()) return showToast('Please enter patient name', 'error');
    if (items.length === 0) return showToast('Please add at least one item', 'error');

    setIsSubmitting(true);
    try {
      // Patient + bill numbers are assigned by the backend.
      const pid =
        patientId ||
        (
          await db.query('patient', 'create', {
            data: {
              name: patientName.trim(),
              mobile: patientMobile.trim(),
              age: Number(patientAge || 0),
              gender: patientGender,
              referredDoctor: doctorName,
            },
          })
        ).id;

      const createdBill = await db.query('bill', 'create', {
        data: {
          patientId: pid,
          patientName: patientName.trim(),
          patientAge: Number(patientAge || 0),
          patientGender,
          patientMobile: patientMobile.trim(),
          doctorName: doctorName.trim(),
          subtotal,
          discountType,
          discountValue: Number(discountValue || 0),
          discountAmount,
          gstPercent: Number(taxPercent || 0),
          gstAmount: taxAmount,
          totalAmount: grandTotal,
          paidAmount: grandTotal,
          dueAmount: 0,
          paymentMethod,
          paymentStatus: 'PAID',
          notes,
          items: {
            create: items.map((it) => ({
              itemName: it.name,
              itemCategory: it.category,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
              total: it.total,
            })),
          },
        },
        include: { items: true },
      });

      if (saveToCatalog) {
        const added: any[] = [];
        for (const item of items.filter((it) => !findCatalog(it.name))) {
          added.push(await db.query('catalogItem', 'create', {
            data: { name: item.name, category: item.category, defaultPrice: item.unitPrice, isCustom: true },
          }));
        }
        if (added.length) setCatalogItems((c) => [...c, ...added]);
      }

      showToast(`Bill ${createdBill.billNo} saved`, 'success');
      setSavedBill(createdBill);

      setPatientName('');
      setPatientMobile('');
      setPatientAge('');
      setPatientId(null);
      setMatches([]);
      setItems([]);
      setDiscountValue(0);
      setPaymentMethod('CASH');
      setNotes('');
    } catch (e: any) {
      showToast(e.message || 'Failed to save bill', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout
      title="New Bill"
      subtitle="Tests, medicines, doctor fee, ultrasound and X-Ray in one bill"
      actions={
        <button
          onClick={handleSaveBill}
          disabled={isSubmitting || items.length === 0}
          className={btnPrimary}
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save & Print Bill'}
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Patient Details & Line Items (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Patient Details Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                1. Patient Information
              </span>
              {patientId ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <UserCheck className="h-3.5 w-3.5" /> Returning patient · {patientId}
                </span>
              ) : (
                patientName.trim() && <span className="text-xs font-semibold text-muted-foreground">New patient</span>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5">
              <div className="col-span-2">
                <label className={labelCls} htmlFor="bill-mobile">Mobile</label>
                <input
                  id="bill-mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10 digits, finds old patient"
                  value={patientMobile}
                  onChange={(e) => lookupMobile(e.target.value)}
                  className={inputCls}
                  autoFocus
                />
              </div>

              <div className="col-span-2">
                <label className={labelCls} htmlFor="bill-name">Patient Name *</label>
                <input
                  id="bill-name"
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                  <label className={labelCls} htmlFor="bill-age">Age</label>
                  <input
                    id="bill-age"
                    type="number"
                    min="0"
                    placeholder="Age"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : '')}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="bill-gender">Gender</label>
                  <select id="bill-gender" value={patientGender} onChange={(e) => setPatientGender(e.target.value)} className={inputCls}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
              </div>

              {matches.length > 0 && (
                <div className="col-span-2 lg:col-span-6 flex flex-wrap items-center gap-1.5 rounded-xl bg-muted/50 p-2 text-xs">
                  <span className="font-semibold text-muted-foreground">Same mobile:</span>
                  {matches.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => pickPatient(m)}
                      className={`rounded-lg border px-2 py-1 font-medium transition-colors cursor-pointer ${
                        patientId === m.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/60'
                      }`}
                    >
                      {m.name} · {m.age}{m.gender?.[0] ? ` ${m.gender[0]}` : ''}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPatientId(null)}
                    className={`rounded-lg border px-2 py-1 font-medium cursor-pointer ${!patientId ? 'border-primary text-primary' : 'border-border bg-card'}`}
                  >
                    + New family member
                  </button>
                </div>
              )}

              <div className="col-span-2 lg:col-span-3">
                <label className={labelCls} htmlFor="bill-doctor">Consulting Doctor</label>
                <div className="flex gap-2">
                  <input
                    id="bill-doctor"
                    type="text"
                    list="doctor-names"
                    placeholder="Type or pick a doctor"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className={inputCls}
                  />
                  {selectedDoctor && !hasDoctorFee && (
                    <button
                      type="button"
                      onClick={() => addItem({ name: `Consultation - ${selectedDoctor.name}`, category: 'Doctor Fee', price: selectedDoctor.consultationFee })}
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/5 px-2.5 text-xs font-semibold text-primary hover:bg-primary/10 cursor-pointer"
                      title="Add this doctor's consultation fee to the bill"
                    >
                      <Plus className="h-3.5 w-3.5" /> Fee {formatCurrency(selectedDoctor.consultationFee)}
                    </button>
                  )}
                </div>
                <datalist id="doctor-names">
                  {doctorsList.map((d) => <option key={d.id} value={d.name}>{d.specialization || ''}</option>)}
                </datalist>
              </div>

              <div className="col-span-2 lg:col-span-3">
                <label className={labelCls}>Note / Diagnosis (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Seasonal flu & body ache"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          {/* Item Search & Catalog Selector */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Search className="h-4 w-4 text-primary" />
                2. Search & Add Medicines / Services
              </span>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveToCatalog}
                  onChange={(e) => setSaveToCatalog(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                Auto-save new items to Catalog
              </label>
            </div>

            {/* Live Autocomplete Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                data-enter-native
                aria-label="Search items"
                placeholder="Type medicine, test, USG, X-Ray or fee… Enter adds the first match"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter' || !searchQuery.trim()) return;
                  e.preventDefault();
                  const first = searchResults[0];
                  if (first) addItem({ name: first.name, category: first.category, price: first.defaultPrice });
                  else addItem({ name: searchQuery.trim(), category: guessCategory(searchQuery), price: 0 }); // new item: set price in the table
                }}
                className={`${inputCls} pl-10 text-base h-11`}
              />

              {/* Autocomplete Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-12 z-40 max-h-60 overflow-y-auto rounded-xl border border-border bg-card shadow-2xl py-1">
                  {searchResults.map((res) => (
                    <button
                      key={res.id || res.name}
                      type="button"
                      onClick={() => addItem({ name: res.name, category: res.category, price: res.defaultPrice })}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs hover:bg-muted/60 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="font-semibold text-foreground block">{res.name}</span>
                        <span className="text-[11px] text-muted-foreground">{res.category} {res.code ? `• ${res.code}` : ''}</span>
                      </div>
                      <span className="font-mono font-bold text-primary">{formatCurrency(res.defaultPrice)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Suggestion Pills */}
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                One-tap add
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_ITEMS.map((q) => ({ ...q, price: findCatalog(q.name)?.defaultPrice ?? q.price })).map((pill) => (
                  <button
                    key={pill.name}
                    type="button"
                    onClick={() => addQuick(pill)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/80 hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
                  >
                    <span>{pill.name}</span>
                    <span className="font-mono text-muted-foreground text-[10px]">{formatCurrency(pill.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Items Table */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-muted/20">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                3. Invoice Items ({items.length})
              </span>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => setItems([])}
                  className="text-xs text-destructive hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr>
                    <th className={th}>Description</th>
                    <th className={th}>Category</th>
                    <th className={`${th} w-24 text-center`}>Qty</th>
                    <th className={`${th} w-28 text-right`}>Unit Price</th>
                    <th className={`${th} w-28 text-right`}>Total</th>
                    <th className={`${th} w-10`}></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className={`${td} font-medium text-foreground`}>{it.name}</td>
                      <td className={td}>
                        <select
                          aria-label={`Category of ${it.name}`}
                          value={it.category}
                          onChange={(e) => updateLine(idx, { category: e.target.value })}
                          className="h-8 rounded-lg border border-border bg-background px-1.5 text-[11px] font-semibold"
                        >
                          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </td>
                      <td className={`${td} text-center`}>
                        <input
                          type="number"
                          min="1"
                          value={it.quantity}
                          onChange={(e) => updateLine(idx, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                          className="w-16 h-8 text-center rounded-lg border border-border bg-background font-semibold"
                        />
                      </td>
                      <td className={`${td} text-right`}>
                        <input
                          type="number"
                          min="0"
                          value={it.unitPrice}
                          onChange={(e) => updateLine(idx, { unitPrice: Math.max(0, parseFloat(e.target.value) || 0) })}
                          className="w-20 h-8 text-right px-2 rounded-lg border border-border bg-background font-semibold"
                        />
                      </td>
                      <td className={`${td} text-right font-bold text-foreground`}>
                        {formatCurrency(it.total)}
                      </td>
                      <td className={td}>
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          aria-label={`Remove ${it.name}`}
                          className="p-1 text-muted-foreground hover:text-destructive rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-muted-foreground">
                        No items yet. Search above or tap a one-tap button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Financial Summary & Payment Options (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-5 sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-3">
              Payment & Final Summary
            </h3>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-semibold text-foreground text-sm">{formatCurrency(subtotal)}</span>
              </div>

              {/* Discount Input */}
              <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-2.5">
                <div className="flex items-center gap-1">
                  <span>Discount:</span>
                  <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted text-[10px]">
                    <button
                      type="button"
                      onClick={() => setDiscountType('FLAT')}
                      className={`px-1.5 py-0.5 rounded ${discountType === 'FLAT' ? 'bg-primary text-primary-foreground font-bold' : ''}`}
                    >
                      ₹
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType('PERCENT')}
                      className={`px-1.5 py-0.5 rounded ${discountType === 'PERCENT' ? 'bg-primary text-primary-foreground font-bold' : ''}`}
                    >
                      %
                    </button>
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value ? Number(e.target.value) : '')}
                  className="w-24 h-8 text-right px-2 rounded-lg border border-border bg-background font-semibold"
                />
              </div>

              {/* Tax / GST Input */}
              <div className="flex items-center justify-between border-t border-border/50 pt-2.5">
                <span>GST / Tax Rate:</span>
                <select
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  className="w-32 h-8 px-2 rounded-lg border border-border bg-background font-semibold text-right"
                >
                  <option value={0}>0% (Exempt)</option>
                  <option value={5}>5% GST</option>
                  <option value={12}>12% GST</option>
                  <option value={18}>18% GST</option>
                </select>
              </div>

              {taxAmount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax Amount:</span>
                  <span>+ {formatCurrency(taxAmount)}</span>
                </div>
              )}

              {/* Grand Total Highlight */}
              <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                    Grand Total
                  </span>
                  <span className="text-[11px] text-muted-foreground">Includes all taxes & discount</span>
                </div>
                <div className="text-2xl font-extrabold text-primary font-mono">
                  {formatCurrency(grandTotal)}
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div className="border-t border-border/60 pt-4 space-y-2">
              <label className={labelCls}>Payment Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {['CASH', 'UPI', 'CARD', 'BANK_TRANSFER'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMethod(mode)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === mode
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-background hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Save & Print Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSaveBill}
                disabled={isSubmitting || items.length === 0}
                className={`w-full py-3 text-sm ${btnPrimary}`}
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save & Print Invoice'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Preview & Print Modal */}
      {savedBill && (
        <InvoiceModal
          bill={savedBill}
          clinicProfile={clinicProfile}
          onClose={() => setSavedBill(null)}
        />
      )}
    </AppLayout>
  );
}
