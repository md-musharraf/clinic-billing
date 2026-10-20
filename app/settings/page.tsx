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
import { inputCls, labelCls, btnPrimary, useToast, ToastView } from '@/components/kit';
import { ClinicDetails, DoctorDetails, InvoiceLook, InvoicePreview, type Clinic } from '@/components/ClinicForm';
import { EMPTY_CLINIC } from '@/lib/clinic-fields';

export default function SettingsPage() {
  const [toast, showToast] = useToast();
  const { machineId, status, tier, daysRemaining, expiryDate, triggerRecheck } = useLicense();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [clinic, setClinic] = useState<Clinic>({ ...EMPTY_CLINIC });

  // Licence activation (keys are made on the admin dashboard)
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    db.query('clinicSettings', 'findFirst', { where: { id: 1 } })
      .then((s) => s && setClinic({ ...EMPTY_CLINIC, ...Object.fromEntries(Object.entries(s).filter(([k, v]) => k in EMPTY_CLINIC && v !== null)) }))
      .catch((e) => showToast(e.message || 'Failed to load clinic settings', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinic.clinicName.trim()) return showToast('Clinic name is required', 'error');
    setSaving(true);
    try {
      const data = Object.fromEntries(Object.keys(EMPTY_CLINIC).map((k) => [k, clinic[k as keyof Clinic]]));
      await db.query('clinicSettings', 'upsert', { where: { id: 1 }, update: data, create: { id: 1, ...data } });
      showToast('Clinic profile and bill design saved', 'success');
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

      <div className="max-w-7xl space-y-8">
        <form onSubmit={handleSaveProfile} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-base font-bold text-foreground">Clinic profile &amp; bill design</h3>
                <p className="text-xs text-muted-foreground">Everything printed on your bills. Changes apply to new prints straight away.</p>
              </div>
            </div>
            <button type="submit" disabled={saving || loading} className={btnPrimary}>
              <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <ClinicDetails value={clinic} onChange={setClinic} />
              <DoctorDetails value={clinic} onChange={setClinic} />
              <InvoiceLook value={clinic} onChange={setClinic} />
            </div>
            <div className="xl:sticky xl:top-0 xl:self-start">
              <InvoicePreview clinic={clinic} />
            </div>
          </div>
        </form>

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
