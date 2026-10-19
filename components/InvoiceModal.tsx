"use client";

import React from 'react';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Modal, btnPrimary, btnGhost } from '@/components/kit';
import { Printer } from 'lucide-react';

export interface InvoiceModalProps {
  bill: any;
  clinicProfile?: any;
  onClose: () => void;
}

export function InvoiceModal({ bill, clinicProfile, onClose }: InvoiceModalProps) {
  if (!bill) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined' && (window as any).electronAPI?.printReceipt) {
      (window as any).electronAPI.printReceipt();
    } else {
      window.print();
    }
  };

  return (
    <Modal title={`Tax Invoice: ${bill.billNo}`} onClose={onClose} wide>
      <div className="p-4 space-y-6 bg-white text-slate-900 rounded-xl font-sans" id="printable-invoice">
        {/* Clinic Header Letterhead */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              {clinicProfile?.clinicName || 'Arogya Medical Clinic & Pharmacy'}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {clinicProfile?.tagline || 'Comprehensive Health & Wellness Center'}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {clinicProfile?.address || 'Main Hospital Road, Medical Hub'} | Phone: {clinicProfile?.phone || '+91 98765 43210'}
            </p>
            <div className="mt-1 flex gap-4 text-[11px] font-semibold text-slate-700">
              {clinicProfile?.dlNumber && <span>D.L. No: {clinicProfile.dlNumber}</span>}
              {clinicProfile?.gstin && <span>GSTIN: {clinicProfile.gstin}</span>}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block bg-slate-900 text-white font-mono font-bold text-xs px-2.5 py-1 rounded">
              TAX INVOICE
            </span>
            <p className="font-mono font-bold text-sm text-slate-900 mt-2">{bill.billNo}</p>
            <p className="text-xs text-slate-500">{formatDateTime(bill.createdAt)}</p>
          </div>
        </div>

        {/* Patient & Doctor Meta */}
        <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-3">
          <div>
            <p className="text-slate-500 uppercase text-[10px] font-bold">Patient Details</p>
            <p className="font-bold text-sm text-slate-900">{bill.patientName}</p>
            <p className="text-slate-600">
              Age: {bill.patientAge || '—'} | Gender: {bill.patientGender || '—'} | Mobile: {bill.patientMobile || '—'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 uppercase text-[10px] font-bold">Consultant Doctor</p>
            <p className="font-bold text-sm text-slate-900">{bill.doctorName || clinicProfile?.doctorName || 'Dr. Verma'}</p>
            <p className="text-slate-600">Payment: {bill.paymentMethod} (PAID)</p>
          </div>
        </div>

        {/* Itemized Table */}
        <table className="w-full text-left text-xs border border-slate-300">
          <thead className="bg-slate-100 border-b border-slate-300">
            <tr>
              <th className="p-2.5 font-bold">Description</th>
              <th className="p-2.5 font-bold">Category</th>
              <th className="p-2.5 font-bold text-center">Qty</th>
              <th className="p-2.5 font-bold text-right">Unit Price</th>
              <th className="p-2.5 font-bold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bill.items?.map((it: any, i: number) => (
              <tr key={i}>
                <td className="p-2.5 font-semibold text-slate-900">{it.itemName}</td>
                <td className="p-2.5 text-slate-600">{it.itemCategory}</td>
                <td className="p-2.5 text-center font-medium">{it.quantity}</td>
                <td className="p-2.5 text-right">{formatCurrency(it.unitPrice)}</td>
                <td className="p-2.5 text-right font-bold text-slate-900">{formatCurrency(it.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Financial Totals */}
        <div className="flex justify-between items-start pt-2">
          <div className="max-w-xs text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Terms & Conditions:</p>
            <p>{clinicProfile?.termsConditions || '1. Consultation valid 7 days. 2. Medicines once sold cannot be returned without original cash memo.'}</p>
          </div>

          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>{formatCurrency(bill.subtotal)}</span>
            </div>
            {bill.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount:</span>
                <span>- {formatCurrency(bill.discountAmount)}</span>
              </div>
            )}
            {bill.gstAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>GST ({bill.gstPercent}%):</span>
                <span>+ {formatCurrency(bill.gstAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-base text-slate-900 border-t-2 border-slate-900 pt-2">
              <span>Total Amount:</span>
              <span>{formatCurrency(bill.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Doctor Signature Block */}
        <div className="pt-10 flex justify-between items-end border-t border-slate-200">
          <div className="text-[10px] text-slate-400">
            Computer Generated Tax Invoice • MedBilling Clinical System
          </div>
          <div className="text-center">
            <div className="h-10 border-b border-dashed border-slate-400 w-48 mb-1" />
            <p className="text-xs font-bold text-slate-900">{clinicProfile?.doctorName || 'Authorized Physician'}</p>
            <p className="text-[10px] text-slate-500">Authorized Signatory</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border no-print">
        <button
          type="button"
          onClick={onClose}
          className={btnGhost}
        >
          Close
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className={btnPrimary}
        >
          <Printer className="h-4 w-4" />
          Print Invoice (Thermal / A4)
        </button>
      </div>
    </Modal>
  );
}
