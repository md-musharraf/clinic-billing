"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { InvoiceModal } from '@/components/InvoiceModal';
import { db, api } from '@/lib/db';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import type { Summary } from '@/lib/owner-report';
import { FEE_GROUPS, SHORT } from '@/lib/billing-summary';
import { inputCls, btnPrimary, th, td, Stat, useLive, useToast, ToastView } from '@/components/kit';
import {
  Users, Receipt, Wallet, AlertTriangle, BadgePercent, Landmark, FileDown, Search, Eye,
  FlaskConical, Pill, Stethoscope, Waves, ScanLine, Package,
} from 'lucide-react';


const GROUP_STYLE: Record<string, { icon: React.ElementType; bar: string; chip: string }> = {
  'Lab Tests': { icon: FlaskConical, bar: 'bg-sky-500', chip: 'bg-sky-500/10 text-sky-600' },
  Medicine: { icon: Pill, bar: 'bg-emerald-500', chip: 'bg-emerald-500/10 text-emerald-600' },
  'Doctor Fee': { icon: Stethoscope, bar: 'bg-indigo-500', chip: 'bg-indigo-500/10 text-indigo-600' },
  Ultrasound: { icon: Waves, bar: 'bg-amber-500', chip: 'bg-amber-500/10 text-amber-600' },
  'X-Ray': { icon: ScanLine, bar: 'bg-rose-500', chip: 'bg-rose-500/10 text-rose-600' },
  Other: { icon: Package, bar: 'bg-slate-400', chip: 'bg-slate-500/10 text-slate-600' },
};

const iso = (d: Date) => d.toLocaleDateString('en-CA'); // local YYYY-MM-DD
const shift = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};
const PRESETS: { label: string; range: () => [Date, Date] }[] = [
  { label: 'Today', range: () => [new Date(), new Date()] },
  { label: 'Yesterday', range: () => [shift(-1), shift(-1)] },
  { label: 'This week', range: () => [shift(-((new Date().getDay() + 6) % 7)), new Date()] },
  { label: 'This month', range: () => { const n = new Date(); return [new Date(n.getFullYear(), n.getMonth(), 1), n]; } },
  { label: 'Last month', range: () => { const n = new Date(); return [new Date(n.getFullYear(), n.getMonth() - 1, 1), new Date(n.getFullYear(), n.getMonth(), 0)]; } },
];

const money = (n: number) => formatCurrency(n);
const day = (s: string) => formatDate(`${s}T00:00`); // YYYY-MM-DD as a local date
const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

export default function OwnerDashboard() {
  const [toast, showToast] = useToast();
  const [from, setFrom] = useState(() => iso(new Date()));
  const [to, setTo] = useState(() => iso(new Date()));
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [clinic, setClinic] = useState<any>(null);
  const [openBill, setOpenBill] = useState<any>(null);
  const [making, setMaking] = useState(false);

  useLive(async () => {
    setLoading(true);
    try {
      const res = await api('owner/summary', { from, to });
      if (res?.success) setData(res.data);
      else showToast(res?.error || 'Could not load the report', 'error');
      if (!clinic) setClinic(await db.query('clinicSettings', 'findFirst', { where: { id: 1 } }));
    } catch (e: any) {
      showToast(e.message || 'Could not load the report', 'error');
    } finally {
      setLoading(false);
    }
  }, ['bill', 'billItem', 'patient'], [from, to]);

  const setRange = ([a, b]: [Date, Date]) => {
    setFrom(iso(a));
    setTo(iso(b));
  };
  const activePreset = PRESETS.find((p) => {
    const [a, b] = p.range();
    return iso(a) === from && iso(b) === to;
  })?.label;
  const period = from === to ? day(from) : `${day(from)} – ${day(to)}`;

  const t = data?.totals;
  const q = search.trim().toLowerCase();
  const rows = (data?.rows || []).filter(
    (r) => !q || r.patientName.toLowerCase().includes(q) || r.billNo.toLowerCase().includes(q) || r.doctorName.toLowerCase().includes(q),
  );
  const sum = (key: string) => rows.reduce((a, r) => a + (Number(r[key]) || 0), 0);
  const maxDay = Math.max(1, ...(data?.days || []).map((d) => d.total));

  const viewBill = async (id: number) => {
    try {
      setOpenBill(await db.query('bill', 'findUnique', { where: { id }, include: { items: true } }));
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  const downloadReport = async () => {
    if (!data || !t) return;
    setMaking(true);
    try {
      // pdf-lib is only loaded when a PDF is asked for.
      const [{ ownerReportPdf }, { downloadPdf }] = await Promise.all([import('@/lib/owner-report'), import('@/lib/pdf-report')]);
      const bytes = await ownerReportPdf(data, clinic, period);
      downloadPdf(bytes, `owner-report-${from}${from === to ? '' : `-to-${to}`}.pdf`);
      showToast('PDF report downloaded');
    } catch (e: any) {
      showToast(e.message || 'Could not make the PDF', 'error');
    } finally {
      setMaking(false);
    }
  };

  return (
    <AppLayout
      title="Owner Dashboard"
      subtitle={`Patients, money and fee breakdown · ${period}`}
      actions={
        <button onClick={downloadReport} disabled={!data || making} className={btnPrimary}>
          <FileDown className="h-4 w-4" />
          {making ? 'Making PDF…' : 'Download PDF'}
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className={`space-y-5 transition-opacity ${loading && data ? 'opacity-60' : ''}`}>
        {/* Period picker */}
        <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setRange(p.range())}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activePreset === p.label ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-end gap-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              From
              <input type="date" value={from} max={to} onChange={(e) => e.target.value && setFrom(e.target.value)} className={`${inputCls} mt-1 h-9 w-40`} />
            </label>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              To
              <input type="date" value={to} min={from} onChange={(e) => e.target.value && setTo(e.target.value)} className={`${inputCls} mt-1 h-9 w-40`} />
            </label>
          </div>
        </div>

        {!data ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">Loading report…</div>
        ) : (
          <>
            {/* Headline numbers */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              <Stat label="Patients" value={t!.patients} hint={`${t!.newPatients} new registrations`} icon={Users} tone="amber" />
              <Stat label="Bills" value={t!.bills} hint={`Avg ${money(t!.bills ? t!.net / t!.bills : 0)}`} icon={Receipt} tone="indigo" />
              <Stat label="Money collected" value={money(t!.paid)} hint={`Net billed ${money(t!.net)}`} icon={Wallet} tone="emerald" />
              <Stat label="Due" value={money(t!.due)} hint={t!.due ? 'Not yet collected' : 'Nothing pending'} icon={AlertTriangle} tone="rose" />
              <Stat label="Discount" value={money(t!.discount)} hint={`${pct(t!.discount, t!.gross)}% of gross`} icon={BadgePercent} tone="sky" />
              <Stat label="GST" value={money(t!.gst)} hint="Tax on bills" icon={Landmark} tone="primary" />
            </div>

            {/* Fee breakdown */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">Where the money came from</h3>
                <p className="text-xs text-muted-foreground">Item totals before discount · gross {money(t!.gross)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                {data.groups.map((g) => {
                  const S = GROUP_STYLE[g.name];
                  const share = pct(g.amount, t!.gross);
                  return (
                    <div key={g.name} className="rounded-xl border border-border/70 bg-background p-3">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${S.chip}`}><S.icon className="h-4 w-4" /></span>
                        <span className="text-xs font-semibold text-muted-foreground">{g.name}</span>
                      </div>
                      <div className="mt-2 text-lg font-extrabold tabular-nums text-foreground">{money(g.amount)}</div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${S.bar} transition-all duration-500`} style={{ width: `${share}%` }} />
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground">{share}% of gross</div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              {/* Doctor-wise */}
              <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm xl:col-span-2">
                <h3 className="border-b border-border px-5 py-3 text-base font-bold text-foreground">Doctor-wise</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className={th}>Doctor</th>
                        <th className={`${th} text-right`}>Patients</th>
                        <th className={`${th} text-right`}>Bills</th>
                        <th className={`${th} text-right`}>Doctor fee</th>
                        <th className={`${th} text-right`}>Total billed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.doctors.map((d) => (
                        <tr key={d.name} className="hover:bg-muted/30">
                          <td className={`${td} font-semibold`}>{d.name}</td>
                          <td className={`${td} text-right tabular-nums`}>{d.patients}</td>
                          <td className={`${td} text-right tabular-nums`}>{d.bills}</td>
                          <td className={`${td} text-right tabular-nums`}>{money(d.doctorFee)}</td>
                          <td className={`${td} text-right font-bold tabular-nums`}>{money(d.total)}</td>
                        </tr>
                      ))}
                      {!data.doctors.length && <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No bills in this period.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Payment modes + day trend */}
              <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-base font-bold text-foreground">Payment modes</h3>
                <div className="space-y-2">
                  {data.methods.map((m) => (
                    <div key={m.name} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{m.name.replace('_', ' ')} <span className="text-xs text-muted-foreground">· {m.bills} {m.bills === 1 ? 'bill' : 'bills'}</span></span>
                      <span className="font-bold tabular-nums">{money(m.amount)}</span>
                    </div>
                  ))}
                  {!data.methods.length && <p className="text-xs text-muted-foreground">No payments yet.</p>}
                </div>
                {data.days.length > 1 && (
                  <div className="border-t border-border pt-4">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Day by day</h4>
                    <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
                      {data.days.map((d) => (
                        <div key={d.date} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2 text-[11px]" title={`${d.patients} patients, ${d.bills} bills`}>
                          <span className="text-muted-foreground">{day(d.date).slice(0, 6)}</span>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${(d.total / maxDay) * 100}%` }} />
                          </div>
                          <span className="font-semibold tabular-nums">{money(d.total)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Patient-wise billing */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Patient billing calculation</h3>
                  <p className="text-xs text-muted-foreground">Every bill split by fee type, with discount, GST and what is still due</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient, bill no or doctor" className={`${inputCls} h-9 pl-9`} />
                </div>
              </div>
              <div className="max-h-[60vh] overflow-auto">
                <table className="w-full whitespace-nowrap text-xs">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className={th}>Date</th>
                      <th className={th}>Patient</th>
                      <th className={th}>Doctor</th>
                      {FEE_GROUPS.map((g) => <th key={g} className={`${th} text-right`}>{SHORT[g]}</th>)}
                      <th className={`${th} text-right`}>Discount</th>
                      <th className={`${th} text-right`}>GST</th>
                      <th className={`${th} text-right`}>Total</th>
                      <th className={`${th} text-right`}>Paid</th>
                      <th className={`${th} text-right`}>Due</th>
                      <th className={th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/30">
                        <td className={`${td} text-muted-foreground`}>{formatDateTime(r.date)}</td>
                        <td className={td}>
                          <span className="font-semibold text-foreground">{r.patientName}</span>
                          <span className="block font-mono text-[10px] text-muted-foreground">{r.billNo}</span>
                        </td>
                        <td className={`${td} text-muted-foreground`}>{r.doctorName || '—'}</td>
                        {FEE_GROUPS.map((g) => <td key={g} className={`${td} text-right tabular-nums ${r[g] ? '' : 'text-muted-foreground/50'}`}>{r[g] ? r[g].toFixed(2) : '–'}</td>)}
                        <td className={`${td} text-right tabular-nums text-emerald-600`}>{r.discount ? `−${r.discount.toFixed(2)}` : '–'}</td>
                        <td className={`${td} text-right tabular-nums`}>{r.gst ? r.gst.toFixed(2) : '–'}</td>
                        <td className={`${td} text-right font-bold tabular-nums`}>{r.total.toFixed(2)}</td>
                        <td className={`${td} text-right tabular-nums`}>{r.paid.toFixed(2)}</td>
                        <td className={`${td} text-right tabular-nums ${r.due ? 'font-semibold text-rose-600' : 'text-muted-foreground/50'}`}>{r.due ? r.due.toFixed(2) : '–'}</td>
                        <td className={td}>
                          <button onClick={() => viewBill(r.id)} className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer" aria-label={`View bill ${r.billNo}`}>
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!rows.length && (
                      <tr><td colSpan={FEE_GROUPS.length + 9} className="py-10 text-center text-muted-foreground">{q ? 'No bill matches your search.' : 'No bills in this period.'}</td></tr>
                    )}
                  </tbody>
                  {rows.length > 0 && (
                    <tfoot className="sticky bottom-0 bg-muted font-bold">
                      <tr>
                        <td className={td} colSpan={3}>Total · {rows.length} bills</td>
                        {FEE_GROUPS.map((g) => <td key={g} className={`${td} text-right tabular-nums`}>{sum(g).toFixed(2)}</td>)}
                        <td className={`${td} text-right tabular-nums`}>{sum('discount').toFixed(2)}</td>
                        <td className={`${td} text-right tabular-nums`}>{sum('gst').toFixed(2)}</td>
                        <td className={`${td} text-right tabular-nums`}>{sum('total').toFixed(2)}</td>
                        <td className={`${td} text-right tabular-nums`}>{sum('paid').toFixed(2)}</td>
                        <td className={`${td} text-right tabular-nums`}>{sum('due').toFixed(2)}</td>
                        <td className={td}></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </section>
          </>
        )}
      </div>

      {openBill && <InvoiceModal bill={openBill} clinicProfile={clinic} onClose={() => setOpenBill(null)} />}
    </AppLayout>
  );
}
