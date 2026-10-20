"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartPulse, ShieldCheck, Copy, Check, ArrowRight, ArrowLeft, AlertCircle, Building2, Stethoscope, Palette, KeyRound, Cpu } from 'lucide-react';
import { inputCls, btnPrimary, btnGhost, Field } from '@/components/kit';
import { ClinicDetails, DoctorDetails, InvoiceLook, InvoicePreview, type Clinic } from '@/components/ClinicForm';
import { useLicense } from '@/components/LicenseProvider';
import { EMPTY_CLINIC } from '@/lib/clinic-fields';
import { api } from '@/lib/db';

const STEPS = [
  { title: 'Your clinic', hint: 'Name and contact printed on every bill', icon: Building2 },
  { title: 'Doctor & tax', hint: 'Signing doctor, GSTIN, drug licence', icon: Stethoscope },
  { title: 'Bill design', hint: 'Logo, signature, colour, paper', icon: Palette },
  { title: 'Owner login', hint: 'Only you see earnings and reports', icon: KeyRound },
];

// First run on a new PC: the clinic registers itself, designs its bill and creates the owner login.
export default function SetupPage() {
  const router = useRouter();
  const { machineId, daysRemaining } = useLicense();
  const [step, setStep] = useState(0);
  const [clinic, setClinic] = useState<Clinic>({ ...EMPTY_CLINIC });
  const [owner, setOwner] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    api('auth/setup-status').then((d) => d && !d.isSetupRequired && !recoveryCode && router.replace('/login')).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // What each step needs before Next.
  const problem = (s: number) => {
    if (s === 0 && (!clinic.clinicName.trim() || !clinic.address.trim() || !clinic.phone.trim())) return 'Clinic name, address and phone are needed for the bill.';
    if (s === 3) {
      if (!owner.name.trim() || !owner.email.trim()) return 'Enter your name and email.';
      if (owner.password.length < 6) return 'Password must be at least 6 characters.';
      if (owner.password !== owner.confirm) return 'Passwords do not match.';
    }
    return null;
  };

  const next = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = problem(step);
    setError(p);
    if (p) return;
    if (step < STEPS.length - 1) return setStep(step + 1);

    setSaving(true);
    try {
      const data = await api('auth/setup', { name: owner.name, email: owner.email, password: owner.password, clinic });
      if (!data?.success) return setError(data?.error || 'Setup failed.');
      localStorage.setItem('medbilling_current_user', JSON.stringify(data.user));
      localStorage.setItem('medbilling_last_login', JSON.stringify({ portal: 'owner', email: data.user.email }));
      setRecoveryCode(data.recoveryCode);
    } catch (err: any) {
      setError(err.message || 'Setup failed.');
    } finally {
      setSaving(false);
    }
  };

  const copy = (text: string, what: string) => {
    navigator.clipboard.writeText(text);
    setCopied(what);
    setTimeout(() => setCopied(null), 2000);
  };

  if (recoveryCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 p-4">
        <div className="w-full max-w-lg space-y-5 rounded-2xl bg-card p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{clinic.clinicName} is ready</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your {daysRemaining}-day free trial has started.</p>
          </div>

          <div className="rounded-2xl border border-dashed border-emerald-500/50 bg-emerald-500/5 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Owner recovery code (write it down)</p>
            <p className="my-1 select-all font-mono text-3xl font-extrabold tracking-widest text-emerald-600">{recoveryCode}</p>
            <p className="text-[11px] text-muted-foreground">You need it to reset the owner password if you forget it.</p>
            <button onClick={() => copy(recoveryCode, 'code')} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer">
              {copied === 'code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied === 'code' ? 'Copied' : 'Copy code'}
            </button>
          </div>

          <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs">
            <p className="flex items-center gap-1.5 font-semibold"><Cpu className="h-3.5 w-3.5 text-primary" /> To buy a licence, send this Machine ID to your provider</p>
            <div className="mt-1.5 flex items-center gap-2">
              <code className="flex-1 truncate font-mono">{machineId}</code>
              <button onClick={() => copy(machineId, 'id')} className="text-primary hover:underline cursor-pointer">{copied === 'id' ? 'Copied' : 'Copy'}</button>
            </div>
            <p className="mt-1 text-muted-foreground">Once they activate it, the app unlocks by itself. You can also find it later in Settings.</p>
          </div>

          <button onClick={() => router.push('/owner')} className={`w-full ${btnPrimary}`}>
            Open owner dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const S = STEPS[step];
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 p-4">
      <form onSubmit={next} className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl" style={{ minHeight: 560 }}>
        {/* Steps */}
        <aside className="hidden w-64 shrink-0 flex-col bg-muted/50 p-6 md:flex">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><HeartPulse className="h-6 w-6" /></div>
            <div>
              <p className="font-bold leading-tight">MedBilling</p>
              <p className="text-[11px] text-muted-foreground">Clinic setup</p>
            </div>
          </div>
          <ol className="space-y-1">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => setStep(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === step ? 'bg-card shadow-sm' : i < step ? 'hover:bg-card/60 cursor-pointer' : 'opacity-50'
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-primary text-primary-foreground' : 'bg-border'}`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{s.title}</span>
                    <span className="block text-[11px] text-muted-foreground">{s.hint}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-auto text-[11px] text-muted-foreground">Everything here can be changed later in Settings.</p>
        </aside>

        {/* Current step */}
        <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
          <div className="mb-5">
            <p className="text-xs font-semibold text-primary">Step {step + 1} of {STEPS.length}</p>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight"><S.icon className="h-6 w-6 text-primary" /> {S.title}</h1>
            <p className="text-sm text-muted-foreground">{S.hint}</p>
          </div>

          <div className="flex-1">
            {step === 0 && <ClinicDetails value={clinic} onChange={setClinic} />}
            {step === 1 && <DoctorDetails value={clinic} onChange={setClinic} />}
            {step === 2 && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <InvoiceLook value={clinic} onChange={setClinic} />
                <InvoicePreview clinic={clinic} />
              </div>
            )}
            {step === 3 && (
              <div className="grid max-w-md grid-cols-1 gap-3">
                <Field label="Your name">
                  <input value={owner.name} onChange={(e) => setOwner({ ...owner, name: e.target.value })} placeholder="e.g. Dr. A. Kumar" className={inputCls} autoFocus />
                </Field>
                <Field label="Login email">
                  <input type="email" autoComplete="username" value={owner.email} onChange={(e) => setOwner({ ...owner, email: e.target.value })} placeholder="owner@yourclinic.com" className={inputCls} />
                </Field>
                <Field label="Password (min. 6)">
                  <input type="password" autoComplete="new-password" value={owner.password} onChange={(e) => setOwner({ ...owner, password: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Confirm password">
                  <input type="password" autoComplete="new-password" value={owner.confirm} onChange={(e) => setOwner({ ...owner, confirm: e.target.value })} className={inputCls} />
                </Field>
                <p className="text-[11px] text-muted-foreground">After this, create reception logins in Staff Logins.</p>
              </div>
            )}
          </div>

          {error && (
            <div role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <button type="button" onClick={() => { setError(null); setStep(step - 1); }} className={`${btnGhost} ${step === 0 ? 'invisible' : ''}`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="submit" disabled={saving} className={btnPrimary}>
              {step === STEPS.length - 1 ? (saving ? 'Setting up…' : 'Finish setup') : 'Next'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
