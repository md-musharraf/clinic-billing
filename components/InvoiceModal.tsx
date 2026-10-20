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
        </div>
        {bill.items?.map((it: any, i: number) => (
          <div key={i} className="flex justify-between gap-2">
            <span className="min-w-0">{it.itemName} {it.quantity > 1 && `×${it.quantity}`}</span>
            <span className="shrink-0 tabular-nums">{Number(it.total).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-1.5 space-y-0.5 border-t border-dashed border-black pt-1">
          {bill.discountAmount > 0 && <div className="flex justify-between"><span>Discount</span><span>-{Number(bill.discountAmount).toFixed(2)}</span></div>}
          {bill.gstAmount > 0 && <div className="flex justify-between"><span>GST {bill.gstPercent}%</span><span>+{Number(bill.gstAmount).toFixed(2)}</span></div>}
          <div className="flex justify-between text-sm font-black"><span>TOTAL</span><span>{formatCurrency(bill.totalAmount)}</span></div>
          <div className="text-[10px]">Paid by {String(bill.paymentMethod || 'CASH').replace('_', ' ')}</div>
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
            {c.gstin ? 'TAX INVOICE' : 'INVOICE'}
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
          <p className="text-slate-600">Paid by {String(bill.paymentMethod || 'CASH').replace('_', ' ')}</p>
        </div>
      </div>

      <table className="w-full border border-slate-300 text-left text-xs">
        <thead className="border-b border-slate-300" style={{ background: `${accent}14` }}>
          <tr>
            <th className="p-2 font-bold">#</th>
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

export function InvoiceModal({ bill, clinicProfile, onClose }: { bill: any; clinicProfile?: any; onClose: () => void }) {
  const [saved, setSaved] = useState<{ path?: string; error?: string } | null>(null);
  if (!bill) return null;

  // Desktop app: the printer's page as a PDF file (works with no printer at all). Browser: its print dialog has "Save as PDF".
  const download = async () => {
    const bridge = (window as any).electronAPI;
    if (!bridge?.savePdf) return window.print();
    setSaved(await bridge.savePdf(bill.billNo).catch((e: Error) => ({ error: e.message })));
  };

  return (
    <Modal title={`Invoice ${bill.billNo}`} onClose={onClose} wide>
      <style>{PAGE_CSS[clinicProfile?.printPaperSize] || PAGE_CSS.A4}</style>
      <InvoiceSheet bill={bill} clinic={clinicProfile} />
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
        <button type="button" onClick={download} className={btnGhost} title="Save this bill as a PDF on this computer">
          <FileDown className="h-4 w-4" /> Download PDF
        </button>
        <button type="button" onClick={printPage} className={btnPrimary} autoFocus>
          <Printer className="h-4 w-4" /> Print
        </button>
      </div>
    </Modal>
  );
}
