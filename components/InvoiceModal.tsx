"use client";

import { useState } from 'react';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Modal, btnPrimary, btnGhost, printPage } from '@/components/kit';
import { Printer, FileDown, FolderOpen } from 'lucide-react';

const PAGE_CSS: Record<string, string> = {
  A4: '@page { size: A4; margin: 10mm; }',
  A5: '@page { size: A5; margin: 8mm; }',
  Thermal80: '@page { size: 80mm auto; margin: 3mm; }',
};

// Shown in the Setup / Settings preview before any real bill exists.
export const SAMPLE_BILL = {
  billNo: 'MED-BIL-00000000-0001',
  createdAt: new Date().toISOString(),
  patientName: 'Sample Patient',
  patientAge: 42,
  patientGender: 'FEMALE',
  patientMobile: '9876500000',
  doctorName: '',
  paymentMethod: 'CASH',
  subtotal: 1350,
  discountAmount: 50,
  gstPercent: 0,
  gstAmount: 0,
  totalAmount: 1300,
  items: [
    { itemName: 'OPD Consultation', itemCategory: 'Doctor Fee', quantity: 1, unitPrice: 300, total: 300 },
    { itemName: 'CBC (Complete Blood Count)', itemCategory: 'Lab Test', quantity: 1, unitPrice: 250, total: 250 },
    { itemName: 'Ultrasound Abdomen', itemCategory: 'Ultrasound', quantity: 1, unitPrice: 800, total: 800 },
  ],
};

// The printed bill. Follows the clinic's logo, colour, signature, paper size and footer from Settings.
export function InvoiceSheet({ bill, clinic }: { bill: any; clinic?: any }) {
  const c = clinic || {};
  const accent = c.printColor || '#0f766e';
  const thermal = c.printPaperSize === 'Thermal80';
  const logo = c.printShowLogo !== false && c.logo;
  const signature = c.printShowSignature !== false && c.doctorSignature;
  const contact = [c.address, c.phone && `Ph: ${c.phone}`, c.email, c.website].filter(Boolean).join(' · ');
  const doctor = bill.doctorName || c.doctorName;
  // Admitted-patient bills: lines from several days get a date, deposits are listed, the balance is shown.
  const day = (d: any) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  const multiDay = new Set((bill.items || []).map((it: any) => it.createdAt && new Date(it.createdAt).toDateString())).size > 1;
  const payments: any[] = bill.payments || [];
  const paid = payments.length ? payments.reduce((a, p) => a + p.amount, 0) : null;
  const balance = paid === null ? 0 : Math.round((bill.totalAmount - paid) * 100) / 100;
  const paidBy = payments.length ? `${payments.length} ${payments.length === 1 ? 'payment' : 'payments'}` : `Paid by ${String(bill.paymentMethod || 'CASH').replace('_', ' ')}`;

  if (thermal) {
    return (
      <div id="printable-invoice" className="mx-auto w-[72mm] bg-white p-2 font-sans text-[11px] leading-snug text-black">
        <div className="text-center">
          {logo && <img src={c.logo} alt="" className="mx-auto mb-1 max-h-12 object-contain" />}
          <div className="text-sm font-black uppercase">{c.clinicName || 'Clinic'}</div>
          {contact && <div className="text-[10px]">{contact}</div>}
          {c.gstin && <div className="text-[10px]">GSTIN: {c.gstin}</div>}
        </div>
        <div className="my-1.5 border-y border-dashed border-black py-1">
          <div className="flex justify-between"><span>{bill.billNo}</span><span>{formatDateTime(bill.createdAt)}</span></div>
          <div>{bill.patientName}{bill.patientAge ? `, ${bill.patientAge}` : ''}{bill.patientGender ? ` ${bill.patientGender[0]}` : ''}</div>
          {doctor && <div>Doctor: {doctor}</div>}
          {bill.notes && <div className="text-[10px]">{bill.notes}</div>}
        </div>
        {bill.items?.map((it: any, i: number) => (
          <div key={i} className="flex justify-between gap-2">
            <span className="min-w-0">{multiDay && `${day(it.createdAt)} · `}{it.itemName} {it.quantity > 1 && `×${it.quantity}`}</span>
            <span className="shrink-0 tabular-nums">{Number(it.total).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-1.5 space-y-0.5 border-t border-dashed border-black pt-1">
          {bill.discountAmount > 0 && <div className="flex justify-between"><span>Discount</span><span>-{Number(bill.discountAmount).toFixed(2)}</span></div>}
          {bill.gstAmount > 0 && <div className="flex justify-between"><span>GST {bill.gstPercent}%</span><span>+{Number(bill.gstAmount).toFixed(2)}</span></div>}
          <div className="flex justify-between text-sm font-black"><span>TOTAL</span><span>{formatCurrency(bill.totalAmount)}</span></div>
          {payments.map((p, i) => (
            <div key={i} className="flex justify-between text-[10px]"><span>{day(p.paidAt)} {p.amount < 0 ? 'Refund' : 'Paid'} {p.method}</span><span>{Number(p.amount).toFixed(2)}</span></div>
          ))}
          {paid !== null && balance !== 0 && <div className="flex justify-between font-bold"><span>{balance > 0 ? 'BALANCE DUE' : 'ADVANCE'}</span><span>{formatCurrency(Math.abs(balance))}</span></div>}
          {paid === null && <div className="text-[10px]">{paidBy}</div>}
        </div>
        {c.footerNote && <div className="mt-2 text-center text-[10px]">{c.footerNote}</div>}
      </div>
    );
  }

  return (
    <div id="printable-invoice" className="space-y-5 rounded-xl bg-white p-5 font-sans text-slate-900">
      <div className="flex items-start justify-between gap-4 border-b-2 pb-4" style={{ borderColor: accent }}>
        <div className="flex min-w-0 items-start gap-3">
          {logo && <img src={c.logo} alt="" className="h-16 w-16 shrink-0 object-contain" />}
          <div className="min-w-0">
            <h2 className="text-2xl font-black uppercase tracking-tight" style={{ color: accent }}>{c.clinicName || 'Your Clinic Name'}</h2>
            {c.tagline && <p className="text-xs font-medium text-slate-600">{c.tagline}</p>}
            {contact && <p className="mt-1 text-xs text-slate-600">{contact}</p>}
            {(c.dlNumber || c.gstin) && (
              <div className="mt-1 flex gap-4 text-[11px] font-semibold text-slate-700">
                {c.dlNumber && <span>D.L. No: {c.dlNumber}</span>}
                {c.gstin && <span>GSTIN: {c.gstin}</span>}
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="inline-block rounded px-2.5 py-1 font-mono text-xs font-bold text-white" style={{ background: accent }}>
            {bill.provisional ? 'RUNNING BILL' : c.gstin ? 'TAX INVOICE' : 'INVOICE'}
          </span>
          <p className="mt-2 font-mono text-sm font-bold">{bill.billNo}</p>
          <p className="text-xs text-slate-500">{formatDateTime(bill.createdAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3 text-xs">
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-500">Patient</p>
          <p className="text-sm font-bold">{bill.patientName}</p>
          <p className="text-slate-600">
            Age: {bill.patientAge || '—'} | Gender: {bill.patientGender || '—'} | Mobile: {bill.patientMobile || '—'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase text-slate-500">Consultant</p>
          <p className="text-sm font-bold">{doctor || '—'}</p>
          <p className="text-slate-600">{paidBy}</p>
        </div>
      </div>
      {bill.notes && <p className="-mt-2 text-xs text-slate-600">{bill.notes}</p>}

      <table className="w-full border border-slate-300 text-left text-xs">
        <thead className="border-b border-slate-300" style={{ background: `${accent}14` }}>
          <tr>
            <th className="p-2 font-bold">#</th>
            {multiDay && <th className="p-2 font-bold">Date</th>}
            <th className="p-2 font-bold">Description</th>
            <th className="p-2 text-center font-bold">Qty</th>
            <th className="p-2 text-right font-bold">Rate</th>
            <th className="p-2 text-right font-bold">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {bill.items?.map((it: any, i: number) => (
            <tr key={i}>
              <td className="p-2 text-slate-500">{i + 1}</td>
              {multiDay && <td className="whitespace-nowrap p-2 text-slate-500">{day(it.createdAt)}</td>}
              <td className="p-2">
                <span className="font-semibold">{it.itemName}</span>
                <span className="ml-1.5 text-[10px] text-slate-500">{it.itemCategory}</span>
              </td>
              <td className="p-2 text-center">{it.quantity}</td>
              <td className="p-2 text-right">{formatCurrency(it.unitPrice)}</td>
              <td className="p-2 text-right font-bold">{formatCurrency(it.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-start justify-between gap-6">
        <div className="max-w-sm space-y-1 text-[11px] text-slate-500">
          {payments.length > 0 && (
            <div className="mb-3">
              <p className="font-semibold text-slate-700">Payments received</p>
              {payments.map((p, i) => (
                <p key={i} className="flex justify-between gap-6 tabular-nums">
                  <span>{day(p.paidAt)} · {p.amount < 0 ? 'Refund' : String(p.method).replace('_', ' ')}{p.reference ? ` · ${p.reference}` : ''}</span>
                  <span>{formatCurrency(p.amount)}</span>
                </p>
              ))}
            </div>
          )}
          {c.termsConditions && (
            <>
              <p className="font-semibold text-slate-700">Terms &amp; Conditions</p>
              <p className="whitespace-pre-line">{c.termsConditions}</p>
            </>
          )}
        </div>
        <div className="w-64 shrink-0 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatCurrency(bill.subtotal)}</span></div>
          {bill.discountAmount > 0 && (
            <div className="flex justify-between font-medium text-emerald-700"><span>Discount</span><span>- {formatCurrency(bill.discountAmount)}</span></div>
          )}
          {bill.gstAmount > 0 && (
            <div className="flex justify-between text-slate-600"><span>GST ({bill.gstPercent}%)</span><span>+ {formatCurrency(bill.gstAmount)}</span></div>
          )}
          <div className="flex justify-between border-t-2 pt-2 text-base font-black" style={{ borderColor: accent }}>
            <span>Total</span><span>{formatCurrency(bill.totalAmount)}</span>
          </div>
          {paid !== null && (
            <>
              <div className="flex justify-between text-slate-600"><span>Paid</span><span>{formatCurrency(paid)}</span></div>
              <div className={`flex justify-between font-bold ${balance > 0 ? 'text-rose-700' : ''}`}>
                <span>{balance > 0 ? 'Balance due' : balance < 0 ? 'Advance to refund' : 'Balance'}</span><span>{formatCurrency(Math.abs(balance))}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-slate-200 pt-6">
        <div className="text-[11px] text-slate-500">{c.footerNote}</div>
        <div className="text-center">
          {signature ? <img src={c.doctorSignature} alt="" className="mx-auto mb-1 h-12 object-contain" /> : <div className="mb-1 h-10 w-48 border-b border-dashed border-slate-400" />}
          <p className="text-xs font-bold">{c.doctorName || 'Authorised Signatory'}</p>
          <p className="text-[10px] text-slate-500">{[c.doctorQualification, c.doctorRegNo && `Reg. ${c.doctorRegNo}`].filter(Boolean).join(' · ') || (c.doctorName ? 'Authorised Signatory' : '')}</p>
        </div>
      </div>
    </div>
  );
}

// Print + "Download PDF" around any printable sheet (bill, running bill, deposit receipt).
export function PrintDialog({ title, fileName, paper, onClose, children }: { title: string; fileName: string; paper?: string; onClose: () => void; children: React.ReactNode }) {
  const [saved, setSaved] = useState<{ path?: string; error?: string } | null>(null);

  // Desktop app: the printer's page as a PDF file (works with no printer at all). Browser: its print dialog has "Save as PDF".
  const download = async () => {
    const bridge = (window as any).electronAPI;
    if (!bridge?.savePdf) return window.print();
    setSaved(await bridge.savePdf(fileName).catch((e: Error) => ({ error: e.message })));
  };

  return (
    <Modal title={title} onClose={onClose} wide>
      <style>{PAGE_CSS[paper || 'A4'] || PAGE_CSS.A4}</style>
      {children}
      {saved && (
        <div role="status" className={`no-print mt-4 flex items-center justify-between gap-3 rounded-xl border p-3 text-xs ${saved.path ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-destructive/30 bg-destructive/10 text-destructive'}`}>
          <span className="min-w-0 truncate">{saved.path ? <>Saved to <b>{saved.path}</b></> : `Could not save the PDF: ${saved.error}`}</span>
          {saved.path && (
            <button type="button" onClick={() => (window as any).electronAPI.openPdf(saved.path)} className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary hover:underline cursor-pointer">
              <FolderOpen className="h-3.5 w-3.5" /> Open
            </button>
          )}
        </div>
      )}
      <div className="no-print mt-4 flex justify-end gap-3 border-t border-border pt-4">
        <button type="button" onClick={onClose} className={btnGhost}>Close</button>
        <button type="button" onClick={download} className={btnGhost} title="Save as a PDF on this computer">
          <FileDown className="h-4 w-4" /> Download PDF
        </button>
        <button type="button" onClick={printPage} className={btnPrimary} autoFocus>
          <Printer className="h-4 w-4" /> Print
        </button>
      </div>
    </Modal>
  );
}

export function InvoiceModal({ bill, clinicProfile, onClose }: { bill: any; clinicProfile?: any; onClose: () => void }) {
  if (!bill) return null;
  return (
    <PrintDialog title={`${bill.provisional ? 'Running bill' : 'Invoice'} ${bill.billNo}`} fileName={bill.billNo} paper={clinicProfile?.printPaperSize} onClose={onClose}>
      <InvoiceSheet bill={bill} clinic={clinicProfile} />
    </PrintDialog>
  );
}

// Small slip for money received from (or refunded to) an admitted patient.
export function ReceiptSheet({ deposit, admission, clinic, billed }: { deposit: any; admission: any; clinic?: any; billed: number }) {
  const c = clinic || {};
  const accent = c.printColor || '#0f766e';
  const deposited = admission.deposits.reduce((a: number, d: any) => a + d.amount, 0);
  const left = Math.round((billed - deposited) * 100) / 100;
  const row = (k: string, v: React.ReactNode) => (
    <div className="flex justify-between gap-4 py-0.5">
      <span className="text-slate-500">{k}</span>
      <span className="text-right font-semibold">{v}</span>
    </div>
  );
  return (
    <div id="printable-invoice" className="mx-auto max-w-md rounded-xl bg-white p-5 font-sans text-sm text-slate-900">
      <div className="border-b-2 pb-3 text-center" style={{ borderColor: accent }}>
        {c.printShowLogo !== false && c.logo && <img src={c.logo} alt="" className="mx-auto mb-1 h-12 object-contain" />}
        <p className="text-lg font-black uppercase" style={{ color: accent }}>{c.clinicName || 'Clinic'}</p>
        <p className="text-[11px] text-slate-500">{[c.address, c.phone && `Ph: ${c.phone}`].filter(Boolean).join(' · ')}</p>
      </div>
      <p className="my-3 text-center text-xs font-bold uppercase tracking-widest">{deposit.amount < 0 ? 'Refund receipt' : 'Payment receipt'}</p>
      {row('Receipt no.', <span className="font-mono">{deposit.receiptNo}</span>)}
      {row('Date', formatDateTime(deposit.receivedAt))}
      {row('Patient', `${admission.patient?.name || ''} (${admission.patientId})`)}
      {row('Admission', `${admission.admissionNo} · since ${formatDateTime(admission.admittedAt)}`)}
      {row('Mode', `${String(deposit.method).replace('_', ' ')}${deposit.reference ? ` · ${deposit.reference}` : ''}`)}
      <div className="my-3 flex items-end justify-between rounded-lg px-3 py-2" style={{ background: `${accent}14` }}>
        <span className="text-xs font-bold uppercase">{deposit.amount < 0 ? 'Refunded' : 'Received'}</span>
        <span className="text-2xl font-black tabular-nums">{formatCurrency(Math.abs(deposit.amount))}</span>
      </div>
      {row('Total deposited', formatCurrency(deposited))}
      {row('Bill so far', formatCurrency(billed))}
      {row(left > 0 ? 'Balance due' : 'Advance left', formatCurrency(Math.abs(left)))}
      <div className="mt-8 flex justify-between text-[10px] text-slate-500">
        <span>{c.footerNote}</span>
        <span className="border-t border-dashed border-slate-400 pt-1">Received by</span>
      </div>
    </div>
  );
}
