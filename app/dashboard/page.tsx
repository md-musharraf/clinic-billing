"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import {
  CreditCard,
  Users,
  TrendingUp,
  Receipt,
  PlusCircle,
  Eye,
  Calendar,
  Activity,
  HeartPulse,
  Pill,
  CheckCircle2,
  Clock,
  Printer,
} from 'lucide-react';
import Link from 'next/link';
import { card, th, td, btnPrimary, btnGhost } from '@/components/kit';
import { InvoiceModal } from '@/components/InvoiceModal';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayRevenue: 0,
    todayBills: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    totalPatients: 0,
    categoryBreakdown: [] as { category: string; amount: number; percentage: number }[],
  });
  const [recentBills, setRecentBills] = useState<any[]>([]);
  const [selectedBill, setSelectedBill] = useState<any | null>(null);
  const [clinicProfile, setClinicProfile] = useState<any | null>(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Fetch Bills
      const allBills = await db.query('bill', 'findMany', {
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { items: true },
      });

      // Total Patients
      const patientCount = await db.query('patient', 'count', {});

      const settings = await db.query('clinicSettings', 'findFirst', { where: { id: 1 } });
      if (settings) setClinicProfile(settings);

      let todayRev = 0;
      let todayCount = 0;
      let weekRev = 0;
      let monthRev = 0;

      const categoryTotals: Record<string, number> = {
        Medicine: 0,
        'Lab Test': 0,
        'Doctor Fee': 0,
        Procedure: 0,
        'Room Charges': 0,
        Miscellaneous: 0,
      };

      allBills.forEach((b: any) => {
        const d = new Date(b.createdAt);
        const amt = Number(b.totalAmount || 0);

        if (d >= new Date(startOfToday)) {
          todayRev += amt;
          todayCount += 1;
        }
        if (d >= startOfWeek) {
          weekRev += amt;
        }
        if (d >= new Date(startOfMonth)) {
          monthRev += amt;
        }

        // Aggregate category revenues from bill items
        if (Array.isArray(b.items)) {
          b.items.forEach((item: any) => {
            const cat = item.itemCategory || 'Medicine';
            categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(item.total || 0);
          });
        }
      });

      const grandTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;
      const breakdown = Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount,
        percentage: Math.round((amount / grandTotal) * 100),
      })).filter(x => x.amount > 0 || ['Medicine', 'Lab Test', 'Doctor Fee'].includes(x.category));

      setStats({
        todayRevenue: todayRev,
        todayBills: todayCount,
        weekRevenue: weekRev,
        monthRevenue: monthRev,
        totalPatients: patientCount,
        categoryBreakdown: breakdown,
      });

      setRecentBills(allBills.slice(0, 8));
    } catch (e) {
      console.error('Failed to load dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <AppLayout
      title="Clinic Dashboard"
      subtitle="Live practice performance, patient footfall, and revenue insights"
      actions={
        <Link href="/billing" className={btnPrimary}>
          <PlusCircle className="h-4 w-4" />
          New Bill (F2)
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Today's Revenue */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Revenue</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold tracking-tight text-foreground">
                {formatCurrency(stats.todayRevenue)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <Receipt className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-foreground">{stats.todayBills}</span> bills generated today
              </p>
            </div>
          </div>

          {/* This Week */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">This Week</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold tracking-tight text-foreground">
                {formatCurrency(stats.weekRevenue)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Monday to Sunday revenue</p>
            </div>
          </div>

          {/* This Month */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">This Month</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold tracking-tight text-foreground">
                {formatCurrency(stats.monthRevenue)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Current calendar month</p>
            </div>
          </div>

          {/* Total Patients */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Patients Registered</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold tracking-tight text-foreground">
                {stats.totalPatients}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Unique patient records in clinic</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue by Category Breakdown */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-foreground">Revenue by Category</h3>
                <p className="text-xs text-muted-foreground">Contribution across Medicines, Lab Tests & Doctor Consultations</p>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </div>

            <div className="space-y-4">
              {stats.categoryBreakdown.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground font-semibold">{item.category}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(item.amount)} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.max(item.percentage, 3)}%` }}
                    />
                  </div>
                </div>
              ))}
              {stats.categoryBreakdown.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">
                  No billing transactions recorded yet. Start billing patients to see category analytics!
                </p>
              )}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground mb-1">Quick Clinical Actions</h3>
              <p className="text-xs text-muted-foreground mb-5">High-frequency clinical workflows</p>

              <div className="space-y-2.5">
                <Link
                  href="/billing"
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/60 hover:bg-muted/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <Receipt className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-foreground block">Patient Billing Counter</span>
                      <span className="text-[11px] text-muted-foreground">Generate GST/Tax bill</span>
                    </div>
                  </div>
                  <kbd className="text-[10px]">F2</kbd>
                </Link>

                <Link
                  href="/catalog"
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/60 hover:bg-muted/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:scale-105 transition-transform">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-foreground block">Item & Price Master</span>
                      <span className="text-[11px] text-muted-foreground">Add/Edit medicines & fees</span>
                    </div>
                  </div>
                  <kbd className="text-[10px]">F3</kbd>
                </Link>

                <Link
                  href="/patients"
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/60 hover:bg-muted/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-foreground block">Patient Directory</span>
                      <span className="text-[11px] text-muted-foreground">View medical & billing history</span>
                    </div>
                  </div>
                  <kbd className="text-[10px]">F6</kbd>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> System Status: Operational
              </span>
              <span>100% Offline</span>
            </div>
          </div>
        </div>

        {/* Recent Invoices Table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground">Recent Invoices</h3>
              <p className="text-xs text-muted-foreground">Latest bills generated at the counter</p>
            </div>
            <Link href="/invoices" className="text-xs font-semibold text-primary hover:underline">
              View All Invoices →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className={th}>Bill No</th>
                  <th className={th}>Patient Name</th>
                  <th className={th}>Date & Time</th>
                  <th className={th}>Doctor</th>
                  <th className={th}>Payment</th>
                  <th className={th}>Grand Total</th>
                  <th className={th}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-muted/30 transition-colors">
                    <td className={`${td} font-mono font-semibold text-primary`}>{bill.billNo}</td>
                    <td className={`${td} font-semibold text-foreground`}>{bill.patientName}</td>
                    <td className={`${td} text-xs text-muted-foreground`}>{formatDateTime(bill.createdAt)}</td>
                    <td className={`${td} text-xs`}>{bill.doctorName || 'Self'}</td>
                    <td className={td}>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {bill.paymentMethod}
                      </span>
                    </td>
                    <td className={`${td} font-bold text-foreground`}>{formatCurrency(bill.totalAmount)}</td>
                    <td className={td}>
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
                {recentBills.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-xs text-muted-foreground">
                      No invoices recorded yet. Click "+ New Bill" to create your first invoice!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Invoice Preview Modal */}
      {selectedBill && (
        <InvoiceModal
          bill={selectedBill}
          clinicProfile={clinicProfile}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </AppLayout>
  );
}
