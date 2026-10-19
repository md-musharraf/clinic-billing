"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartPulse, ShieldCheck, Copy, Check, ArrowRight, AlertCircle, Building2, User, KeyRound } from 'lucide-react';
import { inputCls, labelCls, btnPrimary, Field } from '@/components/kit';

export default function SetupPage() {
  const router = useRouter();

  // Clinic profile
  const [clinicName, setClinicName] = useState('Arogya Medical Clinic & Pharmacy');
  const [doctorName, setDoctorName] = useState('Dr. Rajesh Verma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Main Market Road, Medical Square');
  const [dlNumber, setDlNumber] = useState('DL-20B/21B-94821');
  const [gstin, setGstin] = useState('20AABCU9603R1ZM');

  // Super Admin
  const [adminName, setAdminName] = useState('Medical Administrator');
  const [email, setEmail] = useState('admin@clinic.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      let data;
      const payload = {
        name: adminName,
        email,
        password,
        clinicName,
        doctorName,
        phone,
        address,
        dlNumber,
        gstin,
      };

      if (typeof window !== 'undefined' && (window as any).electronAPI?.authSetup) {
        data = await (window as any).electronAPI.authSetup(payload);
      } else {
        const res = await fetch('/api/auth/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        data = await res.json();
      }

      if (data && data.success) {
        setRecoveryCode(data.recoveryCode);
        localStorage.setItem('medbilling_current_user', JSON.stringify(data.user));
      } else {
        setError(data?.error || 'Failed to complete setup.');
      }
    } catch (err: any) {
      setError(err.message || 'Setup network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (recoveryCode) {
      navigator.clipboard.writeText(recoveryCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (recoveryCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
        <div className="w-full max-w-lg rounded-2xl border border-emerald-500/30 bg-card p-8 shadow-2xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
            Clinic Setup Completed!
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Save this one-time emergency recovery code in a secure location. If you ever forget your password, you will need this code to reset it.
          </p>

          <div className="my-6 rounded-2xl border border-dashed border-emerald-500/50 bg-emerald-500/5 p-5 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Emergency Recovery Code
            </span>
            <div className="font-mono text-3xl font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 select-all">
              {recoveryCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </button>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className={`w-full ${btnPrimary}`}
          >
            Launch Medical Dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 py-10 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <HeartPulse className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Initial Clinic Setup</h1>
            <p className="text-xs text-muted-foreground">Configure your practice profile and create the Master Owner account</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Clinic Profile */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              1. Clinic & Pharmacy Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Clinic / Hospital Name">
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="In-Charge Doctor / Physician">
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Pharmacy Drug License No. (D.L. No)">
                <input
                  type="text"
                  value={dlNumber}
                  onChange={(e) => setDlNumber(e.target.value)}
                  placeholder="e.g. DL-20B/21B-XXXXX"
                  className={inputCls}
                />
              </Field>
              <Field label="GSTIN / Tax ID">
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="e.g. 20AABCU9603R1ZM"
                  className={inputCls}
                />
              </Field>
              <Field label="Contact Phone">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Clinic Address">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          {/* Section 2: Owner Login Account */}
          <div className="border-t border-border pt-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-primary" />
              2. Master Owner Login Account
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Your Full Name">
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Login Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Master Password (Min. 6 chars)">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Confirm Password">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  required
                />
              </Field>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-base ${btnPrimary}`}
            >
              {loading ? 'Creating Clinic...' : 'Complete Setup & Open Software'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
