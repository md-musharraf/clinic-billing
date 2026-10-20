"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/roles';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Plus, Eye, Receipt, Trash2, AlertTriangle } from 'lucide-react';
import { inputCls, btnPrimary, btnGhost, btnDanger, th, td, Modal, Field, useToast, ToastView, useLive, useUser } from '@/components/kit';

const BLANK = { name: '', mobile: '', age: '' as number | '', gender: 'MALE', bloodGroup: '', address: '', referredDoctor: '' };
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export default function PatientsPage() {
  const [toast, showToast] = useToast();
  const user = useUser();
  const owner = isAdmin(user?.role);
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [history, setHistory] = useState<{ patient: any; bills: any[] | null } | null>(null);
  const [deleting, setDeleting] = useState<any>(null);

  // Searches the whole register (not just what is on screen), 200 ms after typing stops; newest first.
  const [query, setQuery] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 200);
    return () => clearTimeout(t);
  }, [search]);
  useLive(async () => {
    try {
      const where: any = { deletedAt: null };
      if (query) where.OR = [{ name: { contains: query } }, { mobile: { contains: query } }, { id: { contains: query.toUpperCase() } }];
      setPatients(
        await db.query('patient', 'findMany', {
          where,
          orderBy: { registeredAt: 'desc' },
          take: 200,
          include: { _count: { select: { bills: true } }, bills: { select: { createdAt: true }, orderBy: { createdAt: 'desc' }, take: 1 } },
        }),
      );
    } catch (e: any) {
      showToast(e.message || 'Failed to load patients', 'error');
    }
  }, ['patient', 'bill'], [query]);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return showToast('Patient name is required', 'error');
    try {
      // Patient ID (MED-YYYY-00001) is assigned by the backend.
      const p = await db.query('patient', 'create', {
        data: { ...form, name: form.name.trim(), mobile: form.mobile.trim(), age: Number(form.age || 0), bloodGroup: form.bloodGroup || null },
      });
      showToast(`${p.name} registered as ${p.id}`, 'success');
      setAdding(false);
      setForm(BLANK);
      setSearch('');
    } catch (e: any) {
      showToast(e.message || 'Failed to register patient', 'error');
    }
  };

  const openHistory = async (patient: any) => {
    setHistory({ patient, bills: null });
    try {
      const bills = await db.query('bill', 'findMany', { where: { patientId: patient.id }, orderBy: { createdAt: 'desc' } });
      setHistory({ patient, bills });
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // Owner only. Hides the patient everywhere; their bills stay in invoices and the owner's reports.
  const confirmDelete = async () => {
    try {
      await db.query('patient', 'update', { where: { id: deleting.id }, data: { deletedAt: new Date().toISOString() } });
      showToast(`${deleting.name} deleted`, 'success');
      setPatients((list) => list.filter((p) => p.id !== deleting.id));
    } catch (e: any) {
      showToast(e.message || 'Failed to delete patient', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const set = (k: keyof typeof BLANK) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <AppLayout
      title="Patients"
      subtitle="Find a patient, start their bill, see their visits"
      actions={
        <button onClick={() => setAdding(true)} className={btnPrimary}>
          <Plus className="h-4 w-4" /> Register patient
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, mobile or patient ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputCls} h-10 pl-10`}
              autoFocus
            />
          </div>
          <span className="whitespace-nowrap text-xs font-semibold text-muted-foreground">{plural(patients.length, 'patient')}</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr>
                  <th className={th}>Patient ID</th>
                  <th className={th}>Name</th>
                  <th className={th}>Age / Gender</th>
                  <th className={th}>Mobile</th>
                  <th className={th}>Doctor</th>
                  <th className={th}>Visits</th>
                  <th className={th}>Last visit</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className={`${td} font-mono font-bold text-primary`}>{p.id}</td>
                    <td className={`${td} text-sm font-semibold`}>
                      {p.name}
                      {p.bloodGroup && <span className="ml-2 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold text-destructive">{p.bloodGroup}</span>}
                    </td>
                    <td className={`${td} text-muted-foreground`}>{p.age} yrs / {p.gender}</td>
                    <td className={td}>{p.mobile || '—'}</td>
                    <td className={`${td} text-muted-foreground`}>{p.referredDoctor || '—'}</td>
                    <td className={td}>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold">{plural(p._count?.bills || 0, 'visit')}</span>
                    </td>
                    <td className={`${td} text-muted-foreground`}>{p.bills?.[0] ? formatDate(p.bills[0].createdAt) : 'Never'}</td>
                    <td className={`${td} text-right`}>
                      <div className="flex justify-end gap-1">
                        <Link href={`/billing?patient=${encodeURIComponent(p.id)}`} className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 font-semibold text-primary-foreground hover:bg-primary/90">
                          <Receipt className="h-3.5 w-3.5" /> Bill
                        </Link>
                        <button onClick={() => openHistory(p)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium text-primary hover:bg-primary/10 cursor-pointer">
                          <Eye className="h-3.5 w-3.5" /> History
                        </button>
                        {owner && (
                          <button onClick={() => setDeleting(p)} aria-label={`Delete ${p.name}`} title="Delete patient" className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!patients.length && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted-foreground">
                      {search ? 'No patient matches your search.' : 'No patients yet. They are added automatically when you make a bill.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {adding && (
        <Modal title="Register patient" onClose={() => setAdding(false)}>
          <form onSubmit={register} className="grid grid-cols-2 gap-3">
            <Field label="Full name *" className="col-span-2">
              <input value={form.name} onChange={set('name')} placeholder="e.g. Anjali Sharma" className={inputCls} required autoFocus />
            </Field>
            <Field label="Mobile">
              <input type="tel" value={form.mobile} onChange={set('mobile')} placeholder="10 digits" className={inputCls} />
            </Field>
            <Field label="Age (years)">
              <input type="number" min="0" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value ? Number(e.target.value) : '' })} className={inputCls} />
            </Field>
            <Field label="Gender">
              <select value={form.gender} onChange={set('gender')} className={inputCls}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </Field>
            <Field label="Blood group">
              <select value={form.bloodGroup} onChange={set('bloodGroup')} className={inputCls}>
                <option value="">Not known</option>
                {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Doctor" className="col-span-2">
              <input value={form.referredDoctor} onChange={set('referredDoctor')} placeholder="optional" className={inputCls} />
            </Field>
            <Field label="Address" className="col-span-2">
              <input value={form.address} onChange={set('address')} placeholder="optional" className={inputCls} />
            </Field>
            <div className="col-span-2 flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" onClick={() => setAdding(false)} className={btnGhost}>Cancel</button>
              <button type="submit" className={btnPrimary}>Register</button>
            </div>
          </form>
        </Modal>
      )}

      {history && (
        <Modal title={`${history.patient.name} · ${history.patient.id}`} onClose={() => setHistory(null)} wide>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/40 p-4 text-xs sm:grid-cols-4">
              <div><span className="block text-[10px] font-bold uppercase text-muted-foreground">Age / Gender</span>{history.patient.age} yrs / {history.patient.gender}</div>
              <div><span className="block text-[10px] font-bold uppercase text-muted-foreground">Mobile</span>{history.patient.mobile || '—'}</div>
              <div><span className="block text-[10px] font-bold uppercase text-muted-foreground">Registered</span>{formatDate(history.patient.registeredAt)}</div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-muted-foreground">Total billed</span>
                <span className="font-bold">{history.bills ? formatCurrency(history.bills.reduce((a, b) => a + b.totalAmount, 0)) : '…'}</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2.5">Bill no</th>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Doctor</th>
                    <th className="p-2.5">Payment</th>
                    <th className="p-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {history.bills?.map((b) => (
                    <tr key={b.id}>
                      <td className="p-2.5 font-mono font-bold text-primary">{b.billNo}</td>
                      <td className="p-2.5 text-muted-foreground">{formatDate(b.createdAt)}</td>
                      <td className="p-2.5">{b.doctorName || '—'}</td>
                      <td className="p-2.5">{b.paymentMethod}</td>
                      <td className="p-2.5 text-right font-bold">{formatCurrency(b.totalAmount)}</td>
                    </tr>
                  ))}
                  {history.bills?.length === 0 && (
                    <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">No bills yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 border-t border-border pt-3">
              <button onClick={() => setHistory(null)} className={btnGhost}>Close</button>
              <Link href={`/billing?patient=${encodeURIComponent(history.patient.id)}`} className={btnPrimary}>
                <Receipt className="h-4 w-4" /> New bill for {history.patient.name.split(' ')[0]}
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete patient?" onClose={() => setDeleting(null)}>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
              <p>
                <b>{deleting.name}</b> ({deleting.id}) will disappear from Patients and from billing search.
                {deleting._count?.bills ? ` Their ${plural(deleting._count.bills, 'bill')} stay in Invoices and your reports.` : ''}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleting(null)} className={btnGhost}>Cancel</button>
              <button onClick={confirmDelete} className={btnDanger}>
                <Trash2 className="h-4 w-4" /> Delete patient
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}
