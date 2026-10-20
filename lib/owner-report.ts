// The owner's on-demand PDF: same numbers as the owner dashboard, laid out for A4 landscape.
import { makeReportPdf, type PdfClinic } from './pdf-report';
import { formatDate } from './utils';
import { FEE_GROUPS, SHORT } from './billing-summary';

export type Summary = {
  totals: Record<'bills' | 'patients' | 'newPatients' | 'gross' | 'discount' | 'gst' | 'net' | 'paid' | 'due' | 'ipdDeposits', number>;
  inHospital?: { patients: number; billed: number; deposits: number; due: number };
  groups: { name: string; amount: number }[];
  methods: { name: string; bills: number; amount: number }[];
  doctors: { name: string; bills: number; patients: number; doctorFee: number; total: number }[];
  days: { date: string; bills: number; patients: number; total: number }[];
  rows: (Record<string, any> & { id: number; billNo: string; date: string; patientName: string; doctorName: string })[];
};


const day = (s: string) => formatDate(`${s}T00:00`); // YYYY-MM-DD as a local date
const shortTime = (d: string) => new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).replace(',', '');
const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

export function ownerReportPdf(data: Summary, clinic: PdfClinic | null, period: string) {
  const t = data.totals;
  const r = (n: number) => `Rs. ${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return makeReportPdf({
    title: 'Owner Billing Report',
    subtitle: `Period: ${period}   |   ${t.bills} bills, ${t.patients} patients`,
    clinic,
    landscape: true,
    tables: [
      {
        title: 'Summary',
        columns: [{ header: 'Item', width: 3 }, { header: 'Value', width: 2, align: 'right' }, { header: 'Item', width: 3 }, { header: 'Value', width: 2, align: 'right' }],
        rows: [
          ['Patients (unique)', t.patients, 'Gross billed (before discount)', r(t.gross)],
          ['New registrations', t.newPatients, 'Discount given', r(t.discount)],
          ['Bills', t.bills, 'GST', r(t.gst)],
          ['Average bill', r(t.bills ? t.net / t.bills : 0), 'Net billed', r(t.net)],
          ['IPD deposits received', r(t.ipdDeposits), 'Money collected (incl. deposits)', r(t.paid)],
          ['Admitted now', data.inHospital ? `${data.inHospital.patients} (balance ${r(data.inHospital.due)})` : '-', 'Due (not collected)', r(t.due)],
        ],
      },
      {
        title: 'Fee breakdown (item totals before discount)',
        columns: [{ header: 'Fee type', width: 4 }, { header: 'Amount', width: 3, align: 'right' }, { header: 'Share', width: 2, align: 'right' }],
        rows: data.groups.map((g) => [g.name, r(g.amount), `${pct(g.amount, t.gross)}%`]),
        totals: ['Total', r(t.gross), '100%'],
      },
      {
        title: 'Doctor-wise',
        columns: [{ header: 'Doctor', width: 4 }, { header: 'Patients', width: 1.5, align: 'right' }, { header: 'Bills', width: 1.5, align: 'right' }, { header: 'Doctor fee', width: 2.5, align: 'right' }, { header: 'Total billed', width: 2.5, align: 'right' }],
        rows: data.doctors.map((d) => [d.name, d.patients, d.bills, r(d.doctorFee), r(d.total)]),
      },
      {
        title: 'Payment modes',
        columns: [{ header: 'Mode', width: 4 }, { header: 'Payments', width: 2, align: 'right' }, { header: 'Collected', width: 3, align: 'right' }],
        rows: data.methods.map((m) => [m.name.replace('_', ' '), m.bills, r(m.amount)]),
        totals: ['Total', t.bills, r(t.paid)],
      },
      ...(data.days.length > 1
        ? [{
            title: 'Day-wise',
            columns: [{ header: 'Date', width: 3 }, { header: 'Patients', width: 2, align: 'right' as const }, { header: 'Bills', width: 2, align: 'right' as const }, { header: 'Net billed', width: 3, align: 'right' as const }],
            rows: data.days.map((d) => [day(d.date), d.patients, d.bills, r(d.total)]),
            totals: ['Total', '', t.bills, r(t.net)],
          }]
        : []),
      {
        title: 'Patient-wise billing',
        columns: [
          { header: 'Date', width: 2.1 }, { header: 'Bill no', width: 3.4 }, { header: 'Patient', width: 2.9 }, { header: 'Doctor', width: 2.4 },
          ...FEE_GROUPS.map((g) => ({ header: SHORT[g], width: 1.45, align: 'right' as const })),
          { header: 'Disc', width: 1.2, align: 'right' }, { header: 'GST', width: 1, align: 'right' }, { header: 'Total', width: 1.6, align: 'right' }, { header: 'Due', width: 1.1, align: 'right' },
        ],
        rows: data.rows.map((x) => [
          shortTime(x.date), x.billNo, x.patientName, x.doctorName || '-',
          ...FEE_GROUPS.map((g) => (x[g] ? x[g].toFixed(2) : '-')),
          x.discount ? x.discount.toFixed(2) : '-', x.gst ? x.gst.toFixed(2) : '-', x.total.toFixed(2), x.due ? x.due.toFixed(2) : '-',
        ]),
        totals: ['Total', `${t.bills} bills`, `${t.patients} patients`, '',
          ...data.groups.map((g) => g.amount.toFixed(2)), t.discount.toFixed(2), t.gst.toFixed(2), t.net.toFixed(2), t.due.toFixed(2)],
      },
    ],
  });
}
