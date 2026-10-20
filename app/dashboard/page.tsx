"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { InvoiceModal } from '@/components/InvoiceModal';
import { db } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { btnPrimary, th, td, Stat, useLive } from '@/components/kit';
import { Receipt, Users, Wallet, Banknote, PlusCircle, Eye, FileText } from 'lucide-react';

// Reception's view: only today's counter work. Earnings across periods live on the owner dashboard.
export default function CounterDashboard() {
  const [bills, setBills] = useState<any[]>([]);
  const [newPatients, setNewPatients] = useState(0);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [admitted, setAdmitted] = useState(0);
  const [clinic, setClinic] = useState<any>(null);
  const [openBill, setOpenBill] = useState<any>(null);

  useLive(async () => {
    const now = new Date();
    const today = { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) };
    try {
      const [b, p, c, d, a] = await Promise.all([
        db.query('bill', 'findMany', { where: { createdAt: today }, orderBy: { createdAt: 'desc' }, include: { items: true, admission: { select: { id: true } } } }),
        db.query('patient', 'count', { where: { registeredAt: today, deletedAt: null } }),
        clinic ? clinic : db.query('clinicSettings', 'findFirst', { where: { id: 1 } }),
        db.query('admissionDeposit', 'findMany', { where: { receivedAt: today } }),
        db.query('admission', 'count', { where: { status: 'ADMITTED' } }),
      ]);
      setDeposits(d || []);
      setAdmitted(a || 0);
      setBills(b || []);
      setNewPatients(p || 0);
      setClinic(c);
    } catch (e) {
      console.error('Failed to load dashboard:', e);
    }
  }, ['bill', 'patient', 'admission']);

  // Admitted patients' money counts when each deposit is received (their discharge bill would count it twice).
  const money = [
    ...bills.filter((b) => !b.admission).map((b) => ({ amount: b.paidAmount || 0, method: b.paymentMethod })),
    ...deposits.map((d) => ({ amount: d.amount, method: d.method })),
  ];
  const collected = money.reduce((a, m) => a + m.amount, 0);
  const cash = money.filter((m) => m.method === 'CASH').reduce((a, m) => a + m.amount, 0);
  const patients = new Set(bills.map((b) => b.patientId)).size;

  return (
    <AppLayout
      title="Today at the Counter"
      subtitle={new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      actions={
        <Link href="/billing" className={btnPrimary}>
          <PlusCircle className="h-4 w-4" /> New Bill (F2)
        </Link>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Bills today" value={bills.length} icon={Receipt} tone="indigo" />
          <Stat label="Patients billed" value={patients} hint={`${newPatients} new registrations`} icon={Users} tone="amber" />
          <Stat label="Collected today" value={formatCurrency(collected)} icon={Wallet} tone="emerald" />
          <Stat label="Cash in drawer" value={formatCurrency(cash)} hint={`Cash bills + deposits · ${admitted} admitted now`} icon={Banknote} tone="primary" />
        </div>

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h3 className="text-base font-bold text-foreground">Today&apos;s bills</h3>
            <Link href="/invoices" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              <FileText className="h-3.5 w-3.5" /> All invoices
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className={th}>Time</th>
                  <th className={th}>Bill No</th>
                  <th className={th}>Patient</th>
                  <th className={th}>Doctor</th>
                  <th className={th}>Payment</th>
                  <th className={`${th} text-right`}>Total</th>
                  <th className={th}></th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/30">
                    <td className={`${td} text-muted-foreground`}>{new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className={`${td} font-mono font-semibold text-primary`}>{b.billNo}</td>
                    <td className={`${td} font-semibold`}>{b.patientName}</td>
                    <td className={td}>{b.doctorName || 'Self'}</td>
                    <td className={td}>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">{b.paymentMethod}</span>
                    </td>
                    <td className={`${td} text-right font-bold tabular-nums`}>{formatCurrency(b.totalAmount)}</td>
                    <td className={td}>
                      <button onClick={() => setOpenBill(b)} className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer">
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {!bills.length && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-muted-foreground">
                      No bills yet today. Press <kbd>F2</kbd> to make the first one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {openBill && <InvoiceModal bill={openBill} clinicProfile={clinic} onClose={() => setOpenBill(null)} />}
    </AppLayout>
  );
}
