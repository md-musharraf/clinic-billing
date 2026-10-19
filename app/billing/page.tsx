"use client";

import { useState, useEffect, useRef } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import {
  Receipt,
  Plus,
  Trash2,
  Printer,
  Save,
  Search,
  User,
  Phone,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Pill,
  Beaker,
  HeartPulse,
  BadgePercent,
  Check,
} from 'lucide-react';
import { inputCls, labelCls, btnPrimary, btnGhost, card, th, td, useToast, ToastView } from '@/components/kit';
import { InvoiceModal } from '@/components/InvoiceModal';

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
  const [patientAge, setPatientAge] = useState<number | ''>(32);
  const [patientGender, setPatientGender] = useState('MALE');
  const [doctorName, setDoctorName] = useState('Dr. Rajesh Verma');
  const [doctorsList, setDoctorsList] = useState<any[]>([]);

  // Item Search & Catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogItems, setCatalogItems] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Billing Line Items
  const [items, setItems] = useState<LineItem[]>([
    { name: 'General OPD Consultation', category: 'Doctor Fee', quantity: 1, unitPrice: 300, total: 300 },
    { name: 'Paracetamol 650mg', category: 'Medicine', quantity: 10, unitPrice: 8, total: 80 },
  ]);

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

  // Quick Suggestion Pills
  const quickPills = [
    { name: 'Paracetamol 650mg', category: 'Medicine', price: 8 },
    { name: 'Azithromycin 500mg', category: 'Medicine', price: 22 },
    { name: 'Pantoprazole 40mg', category: 'Medicine', price: 12 },
    { name: 'Amoxicillin 500mg', category: 'Medicine', price: 15 },
    { name: 'CBC (Complete Blood Count)', category: 'Lab Test', price: 250 },
    { name: 'Blood Sugar (Fasting/PP)', category: 'Lab Test', price: 80 },
    { name: 'ECG (12 Lead)', category: 'Lab Test', price: 200 },
    { name: 'General OPD Consultation', category: 'Doctor Fee', price: 300 },
    { name: 'Specialist Consultation', category: 'Doctor Fee', price: 500 },
    { name: 'Wound Dressing (Minor)', category: 'Procedure', price: 150 },
    { name: 'Nebulization Session', category: 'Procedure', price: 100 },
    { name: 'General Ward Bed (24h)', category: 'Room Charges', price: 800 },
  ];

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

  // Add Item to Bill
  const addItem = (item: { name: string; category: string; price: number }) => {
    const existingIndex = items.findIndex((it) => it.name.toLowerCase() === item.name.toLowerCase());
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].total = updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setItems(updated);
    } else {
      setItems([
        ...items,
        {
          name: item.name,
          category: item.category || 'Medicine',
          quantity: 1,
          unitPrice: Number(item.price || 0),
          total: Number(item.price || 0),
        },
      ]);
    }
    setSearchQuery('');
    setShowDropdown(false);
  };

  const updateQuantity = (index: number, qty: number) => {
    if (qty < 1) return;
    const updated = [...items];
    updated[index].quantity = qty;
    updated[index].total = qty * updated[index].unitPrice;
    setItems(updated);
  };

  const updateUnitPrice = (index: number, price: number) => {
    const updated = [...items];
    updated[index].unitPrice = price;
    updated[index].total = updated[index].quantity * price;
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Save Bill to DB
  const handleSaveBill = async () => {
    if (!patientName.trim()) {
      showToast('Please enter patient name', 'error');
      return;
    }
    if (items.length === 0) {
      showToast('Please add at least one line item', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Ensure Patient Record exists or create one
      let pid = patientId;
      if (!pid) {
        const year = new Date().getFullYear();
        const pCount = await db.query('patient', 'count', {});
        const generatedId = `MED-${year}-${String(pCount + 1).padStart(5, '0')}`;
        const newPat = await db.query('patient', 'create', {
          data: {
            id: generatedId,
            name: patientName.trim(),
            mobile: patientMobile.trim(),
            age: Number(patientAge || 0),
            gender: patientGender,
            referredDoctor: doctorName,
          },
        });
        pid = newPat.id;
        setPatientId(pid);
      }

      // 2. Generate and Save Bill
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
      const billCount = await db.query('bill', 'count', {
        where: { billNo: { startsWith: `MED-BIL-${dateStr}` } },
      });
      const billNo = `MED-BIL-${dateStr}-${String(billCount + 1).padStart(4, '0')}`;

      const createdBill = await db.query('bill', 'create', {
        data: {
          billNo,
          patientId: pid,
          patientName: patientName.trim(),
          patientAge: Number(patientAge || 0),
          patientGender,
          patientMobile: patientMobile.trim(),
          doctorName,
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

      // 3. Save new custom items to master catalog if requested
      if (saveToCatalog) {
        for (const item of items) {
          const exists = catalogItems.some((c) => c.name.toLowerCase() === item.name.toLowerCase());
          if (!exists) {
            await db.query('catalogItem', 'create', {
              data: {
                name: item.name,
                category: item.category,
                defaultPrice: item.unitPrice,
                isCustom: true,
              },
            });
          }
        }
      }

      showToast(`Bill #${createdBill.billNo} saved successfully!`, 'success');
      setSavedBill(createdBill);

      // Reset form
      setPatientName('');
      setPatientMobile('');
      setPatientId(null);
      setItems([]);
      setDiscountValue(0);
      setNotes('');
    } catch (e: any) {
      showToast(e.message || 'Failed to save bill', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined' && (window as any).electronAPI?.printReceipt) {
      (window as any).electronAPI.printReceipt();
    } else {
      window.print();
    }
  };

  return (
    <AppLayout
      title="Rapid Patient Billing Counter"
      subtitle="Universal billing for Medicines, Lab Tests, Doctor Consultations, and Procedures"
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
              {patientId && (
                <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  ID: {patientId}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="sm:col-span-2">
                <label className={labelCls}>Patient Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className={inputCls}
                  autoFocus
                />
              </div>

              <div>
                <label className={labelCls}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={patientMobile}
                  onChange={(e) => setPatientMobile(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : '')}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className={inputCls}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Consulting Doctor / Prescriber</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Verma"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Billing Note / Diagnosis (Optional)</label>
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
                placeholder="Type medicine name, lab test, doctor fee or procedure..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim() && searchResults.length === 0) {
                    e.preventDefault();
                    addItem({ name: searchQuery.trim(), category: 'Medicine', price: 10 });
                  }
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
                Quick Selection Pills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPills.map((pill) => (
                  <button
                    key={pill.name}
                    type="button"
                    onClick={() => addItem(pill)}
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
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground">
                          {it.category}
                        </span>
                      </td>
                      <td className={`${td} text-center`}>
                        <input
                          type="number"
                          min="1"
                          value={it.quantity}
                          onChange={(e) => updateQuantity(idx, parseInt(e.target.value) || 1)}
                          className="w-16 h-8 text-center rounded-lg border border-border bg-background font-semibold"
                        />
                      </td>
                      <td className={`${td} text-right`}>
                        <input
                          type="number"
                          min="0"
                          value={it.unitPrice}
                          onChange={(e) => updateUnitPrice(idx, parseFloat(e.target.value) || 0)}
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
                        No items added yet. Click on any Quick Suggestion Pill above or type in the search bar.
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
                  className="w-24 h-8 px-2 rounded-lg border border-border bg-background font-semibold text-right"
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
