"use client";

import { useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { ACCENTS, PAPER_SIZES, EMPTY_CLINIC } from '@/lib/clinic-fields';
import { InvoiceSheet, SAMPLE_BILL } from '@/components/InvoiceModal';
import { Field, inputCls, labelCls } from '@/components/kit';

export type Clinic = typeof EMPTY_CLINIC;
type Props = { value: Clinic; onChange: (next: Clinic) => void };

// Shrinks an uploaded picture so it stays small in the database and sharp on paper.
async function readImage(file: File, max = 480): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function ImagePick({ label, hint, value, onChange }: { label: string; hint: string; value: string; onChange: (v: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-2.5">
        <div className="flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
          {value ? <img src={value} alt="" className="max-h-full max-w-full object-contain" /> : <ImagePlus className="h-5 w-5 text-muted-foreground" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground">{hint}</p>
          <div className="mt-1 flex gap-2">
            <button type="button" onClick={() => input.current?.click()} className="text-xs font-semibold text-primary hover:underline cursor-pointer">
              {value ? 'Change' : 'Upload'}
            </button>
            {value && (
              <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline cursor-pointer">
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            )}
          </div>
        </div>
        <input
          ref={input}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (file) onChange(await readImage(file));
          }}
        />
      </div>
    </div>
  );
}

export function ClinicDetails({ value: c, onChange }: Props) {
  const set = (k: keyof Clinic) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...c, [k]: e.target.value });
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Field label="Clinic name *" className="sm:col-span-2">
        <input value={c.clinicName} onChange={set('clinicName')} placeholder="e.g. City Care Clinic & Diagnostics" className={inputCls} required />
      </Field>
      <Field label="Tagline" className="sm:col-span-2">
        <input value={c.tagline} onChange={set('tagline')} placeholder="e.g. OPD · Lab · Ultrasound · X-Ray" className={inputCls} />
      </Field>
      <Field label="Address *" className="sm:col-span-2">
        <input value={c.address} onChange={set('address')} placeholder="Street, town, district, PIN" className={inputCls} required />
      </Field>
      <Field label="Phone *">
        <input value={c.phone} onChange={set('phone')} placeholder="e.g. 98765 43210" className={inputCls} required />
      </Field>
      <Field label="Email">
        <input type="email" value={c.email} onChange={set('email')} placeholder="clinic@example.com" className={inputCls} />
      </Field>
      <Field label="Website" className="sm:col-span-2">
        <input value={c.website} onChange={set('website')} placeholder="optional" className={inputCls} />
      </Field>
    </div>
  );
}

export function DoctorDetails({ value: c, onChange }: Props) {
  const set = (k: keyof Clinic) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...c, [k]: e.target.value });
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Field label="Main doctor (signs the bills)" className="sm:col-span-2">
        <input value={c.doctorName} onChange={set('doctorName')} placeholder="e.g. Dr. A. Kumar" className={inputCls} />
      </Field>
      <Field label="Qualification">
        <input value={c.doctorQualification} onChange={set('doctorQualification')} placeholder="e.g. MBBS, MD" className={inputCls} />
      </Field>
      <Field label="Registration no.">
        <input value={c.doctorRegNo} onChange={set('doctorRegNo')} placeholder="e.g. JMC-12345" className={inputCls} />
      </Field>
      <Field label="GSTIN">
        <input value={c.gstin} onChange={set('gstin')} placeholder="Leave empty if not registered" className={`${inputCls} uppercase`} />
      </Field>
      <Field label="Drug licence no. (pharmacy)">
        <input value={c.dlNumber} onChange={set('dlNumber')} placeholder="Leave empty if no pharmacy" className={inputCls} />
      </Field>
      <p className="text-[11px] text-muted-foreground sm:col-span-2">
        With a GSTIN the bill prints as <b>TAX INVOICE</b>, otherwise as <b>INVOICE</b>. Other doctors and their fees go in Doctors.
      </p>
    </div>
  );
}

export function InvoiceLook({ value: c, onChange }: Props) {
  const patch = (p: Partial<Clinic>) => onChange({ ...c, ...p });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ImagePick label="Clinic logo" hint="PNG or JPG" value={c.logo} onChange={(logo) => patch({ logo })} />
        <ImagePick label="Doctor's signature" hint="Photo of signature on white paper" value={c.doctorSignature} onChange={(doctorSignature) => patch({ doctorSignature })} />
      </div>

      <div>
        <span className={labelCls}>Colour</span>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Colour ${color}`}
              aria-pressed={c.printColor === color}
              onClick={() => patch({ printColor: color })}
              className={`h-8 w-8 rounded-full border-2 transition-transform cursor-pointer ${c.printColor === color ? 'scale-110 border-foreground' : 'border-transparent'}`}
              style={{ background: color }}
            />
          ))}
          <input type="color" aria-label="Custom colour" value={c.printColor} onChange={(e) => patch({ printColor: e.target.value })} className="h-8 w-10 cursor-pointer rounded border border-border bg-transparent" />
        </div>
      </div>

      <div>
        <span className={labelCls}>Paper</span>
        <div className="grid grid-cols-3 gap-2">
          {PAPER_SIZES.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={c.printPaperSize === p.id}
              onClick={() => patch({ printPaperSize: p.id })}
              className={`rounded-xl border px-2 py-2 text-xs font-semibold transition-all cursor-pointer ${
                c.printPaperSize === p.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={c.printShowLogo} onChange={(e) => patch({ printShowLogo: e.target.checked })} className="h-4 w-4 accent-[hsl(var(--primary))]" />
          Print logo
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={c.printShowSignature} onChange={(e) => patch({ printShowSignature: e.target.checked })} className="h-4 w-4 accent-[hsl(var(--primary))]" />
          Print signature
        </label>
      </div>

      <Field label="Thank-you line">
        <input value={c.footerNote} onChange={(e) => patch({ footerNote: e.target.value })} placeholder="e.g. Get well soon!" className={inputCls} />
      </Field>
      <Field label="Terms printed on the bill">
        <textarea
          rows={2}
          value={c.termsConditions}
          onChange={(e) => patch({ termsConditions: e.target.value })}
          placeholder="e.g. Consultation valid for 7 days. Medicines are not taken back without the bill."
          className={`${inputCls} py-2`}
        />
      </Field>
    </div>
  );
}

// The invoice exactly as it will print, with a sample patient.
export function InvoicePreview({ clinic }: { clinic: Clinic }) {
  const thermal = clinic.printPaperSize === 'Thermal80';
  return (
    <div className="rounded-2xl border border-border bg-slate-100 p-3 dark:bg-slate-800">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Live preview</p>
      <div className="overflow-hidden rounded-lg bg-white shadow-sm" style={{ zoom: thermal ? 0.9 : 0.56 }}>
        <InvoiceSheet bill={SAMPLE_BILL} clinic={clinic} />
      </div>
    </div>
  );
}
