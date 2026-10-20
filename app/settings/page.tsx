"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db, api } from '@/lib/db';
import { useLicense } from '@/components/LicenseProvider';
import {
  Settings,
  Building2,
  FileText,
  KeyRound,
  Save,
  Cpu,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { inputCls, labelCls, btnPrimary, card, Field, useToast, ToastView } from '@/components/kit';

export default function SettingsPage() {
  const [toast, showToast] = useToast();
  const { machineId, status, tier, daysRemaining, expiryDate, triggerRecheck } = useLicense();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Clinic Profile State
  const [clinicName, setClinicName] = useState('Arogya Medical Clinic & Pharmacy');
  const [tagline, setTagline] = useState('Comprehensive Health & Wellness Center');
  const [address, setAddress] = useState('Main Hospital Road, Medical Hub');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('contact@arogyaclinic.com');
  const [website, setWebsite] = useState('www.arogyaclinic.com');
  const [doctorName, setDoctorName] = useState('Dr. Rajesh Verma');
  const [doctorQualification, setDoctorQualification] = useState('MBBS, MD (Medicine)');
  const [doctorRegNo, setDoctorRegNo] = useState('MCI-82341/2012');
  const [dlNumber, setDlNumber] = useState('DL-20B/21B-89234');
  const [gstin, setGstin] = useState('20AABCU9603R1ZM');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [termsConditions, setTermsConditions] = useState(
    '1. Consultation validity: 7 days. 2. Medicines once sold cannot be returned without original cash memo.'
  );

  // Licence activation (keys are made on the admin dashboard)
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const s = await db.query('clinicSettings', 'findFirst', { where: { id: 1 } });
        if (s) {
          if (s.clinicName) setClinicName(s.clinicName);
          if (s.tagline) setTagline(s.tagline);
          if (s.address) setAddress(s.address);
          if (s.phone) setPhone(s.phone);
          if (s.email) setEmail(s.email);
          if (s.website) setWebsite(s.website);
          if (s.doctorName) setDoctorName(s.doctorName);
          if (s.doctorQualification) setDoctorQualification(s.doctorQualification);
          if (s.doctorRegNo) setDoctorRegNo(s.doctorRegNo);
          if (s.dlNumber) setDlNumber(s.dlNumber);
          if (s.gstin) setGstin(s.gstin);
          if (s.currencySymbol) setCurrencySymbol(s.currencySymbol);
          if (s.termsConditions) setTermsConditions(s.termsConditions);
        }
      } catch (e: any) {
        showToast(e.message || 'Failed to load clinic settings', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await db.query('clinicSettings', 'upsert', {
        where: { id: 1 },
        update: {
          clinicName,
          tagline,
          address,
          phone,
          email,
          website,
          doctorName,
          doctorQualification,
          doctorRegNo,
          dlNumber,
          gstin,
          currencySymbol,
          termsConditions,
        },
        create: {
          id: 1,
          clinicName,
          tagline,
          address,
          phone,
          email,
          website,
          doctorName,
          doctorQualification,
          doctorRegNo,
          dlNumber,
          gstin,
          currencySymbol,
          termsConditions,
        },
      });
      showToast('Clinic profile updated successfully!', 'success');
    } catch (e: any) {
      showToast(e.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleActivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKeyInput.trim()) return;

    try {
      const res = await api('license/activate', { licenseKey: licenseKeyInput.trim() });

      if (res.success) {
        showToast('License activated successfully!', 'success');
        setLicenseKeyInput('');
        await triggerRecheck();
      } else {
        showToast(res.error || 'Failed to activate license', 'error');
      }
    } catch (e: any) {
      showToast(e.message || 'License activation failed', 'error');
    }
  };

  const copyMachineId = () => {
    navigator.clipboard.writeText(machineId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <AppLayout
      title="Clinic Profile & SaaS Licensing"
      subtitle="Manage clinic branding, letterhead, Doctor D.L. numbers, and offline activation keys"
    >
      <ToastView toast={toast} />

      <div className="max-w-5xl space-y-8">
        {/* Section 1: Clinic Branding */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Building2 className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-base font-bold text-foreground">Clinic Letterhead & Branding</h3>
              <p className="text-xs text-muted-foreground">Information printed on bills, receipts, and patient reports</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Clinic / Hospital Name *">
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Clinic Tagline">
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Address *">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Phone Number *">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Email Address">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Website URL">
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="border-t border-border/60 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="In-Charge Doctor Name">
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Doctor Qualification">
                <input
                  type="text"
                  value={doctorQualification}
                  onChange={(e) => setDoctorQualification(e.target.value)}
                  placeholder="e.g. MBBS, MD"
                  className={inputCls}
                />
              </Field>
              <Field label="Medical Council Reg No">
                <input
                  type="text"
                  value={doctorRegNo}
                  onChange={(e) => setDoctorRegNo(e.target.value)}
                  placeholder="e.g. MCI-48291"
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="border-t border-border/60 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Pharmacy Drug License No. (D.L. No)">
                <input
                  type="text"
                  value={dlNumber}
                  onChange={(e) => setDlNumber(e.target.value)}
                  placeholder="DL-20B/21B-XXXXX"
                  className={inputCls}
                />
              </Field>
              <Field label="GSTIN / Tax ID">
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="GST Number"
                  className={inputCls}
                />
              </Field>
              <Field label="Currency Symbol">
                <input
                  type="text"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Invoice Terms & Conditions">
              <textarea
                rows={2}
                value={termsConditions}
                onChange={(e) => setTermsConditions(e.target.value)}
                className={`${inputCls} py-2`}
              />
            </Field>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className={btnPrimary}
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving Profile...' : 'Save Clinic Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Hardware-Locked Licensing */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <KeyRound className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-base font-bold text-foreground">Licence</h3>
              <p className="text-xs text-muted-foreground">Locked to this PC and managed from the administrator&apos;s dashboard</p>
            </div>
          </div>

          {/* Machine ID Banner */}
          <div className="rounded-xl bg-muted/60 border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                <Cpu className="h-3.5 w-3.5 text-primary" />
                This PC Hardware Fingerprint (Machine ID)
              </span>
              <code className="text-xs font-mono font-bold text-foreground block select-all">
                {machineId}
              </code>
            </div>
            <button
              onClick={copyMachineId}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            >
              {copiedId ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedId ? 'Copied!' : 'Copy Hardware ID'}
            </button>
          </div>

          {/* Status Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                License Status
              </span>
              <span className="text-base font-extrabold text-foreground mt-1 flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {status === 'ACTIVE' ? 'PRO ACTIVE' : status === 'TRIAL' ? 'FREE TRIAL' : status}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                Days Remaining
              </span>
              <span className="text-base font-extrabold text-foreground mt-1 font-mono">
                {daysRemaining} Days{expiryDate ? ` (till ${expiryDate})` : ''}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                License Tier
              </span>
              <span className="text-base font-extrabold text-primary mt-1 font-mono">
                {tier} EDITION
              </span>
            </div>
          </div>

          {/* Activate Key Form */}
          <form onSubmit={handleActivateKey} className="space-y-3 border-t border-border/60 pt-4">
            <label className={labelCls}>Activate License Key</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter or paste offline license key..."
                value={licenseKeyInput}
                onChange={(e) => setLicenseKeyInput(e.target.value)}
                className={inputCls}
              />
              <button type="submit" className={`${btnPrimary} shrink-0`}>
                Activate Key
              </button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground">
            Licence keys come from your administrator. Send them the Machine ID above; when they renew or pause your
            licence on their dashboard, this PC picks it up by itself while it is online.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
