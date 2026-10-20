"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, HeartPulse, Eye, EyeOff, AlertCircle, Check, Crown, ConciergeBell } from 'lucide-react';
import { useEnterAsTab } from '@/lib/useEnterAsTab';
import { api } from '@/lib/db';
import { homeFor } from '@/lib/roles';
import { inputCls, btnPrimary, btnGhost, Modal, Field } from '@/components/kit';

type Portal = 'owner' | 'reception';
const LAST_KEY = 'medbilling_last_login'; // { portal, email }

const PORTALS: Record<Portal, { label: string; icon: React.ElementType; hint: string; placeholder: string }> = {
  owner: { label: 'Owner', icon: Crown, hint: 'Earnings, patients, fee reports and staff', placeholder: 'owner@clinic.com' },
  reception: { label: 'Reception', icon: ConciergeBell, hint: 'Patient billing, invoices and registration', placeholder: 'reception@clinic.com' },
};

export default function LoginPage() {
  const router = useRouter();
  const [portal, setPortal] = useState<Portal>('reception');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [recovering, setRecovering] = useState(false);
  const [recovery, setRecovery] = useState({ email: '', code: '', password: '' });
  const [recoveryMsg, setRecoveryMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEnterAsTab();

  useEffect(() => {
    localStorage.removeItem('medbilling_current_user');
    api('auth/logout');
    try {
      const last = JSON.parse(localStorage.getItem(LAST_KEY) || 'null');
      if (last?.portal) setPortal(last.portal);
      if (last?.email) {
        setEmail(last.email);
        setTimeout(() => document.getElementById('login-password')?.focus(), 0);
      }
    } catch {}
    api('auth/setup-status').then((d) => d?.isSetupRequired && router.push('/setup')).catch(() => {});
  }, [router]);

  const switchPortal = (p: Portal) => {
    setPortal(p);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError('Please enter both email and password.');
    setLoading(true);
    try {
      const data = await api('auth/login', { email: email.trim(), password, portal });
      if (!data?.success) return setError(data?.error || 'Invalid email or password.');
      localStorage.setItem(LAST_KEY, JSON.stringify({ portal, email: email.trim() }));
      localStorage.setItem('medbilling_current_user', JSON.stringify(data.user));
      router.push(homeFor(data.user.role));
    } catch (err: any) {
      setError(err.message || 'Login connection failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await api('auth/recover', {
      email: recovery.email.trim(),
      recoveryCode: recovery.code.trim(),
      newPassword: recovery.password,
    }).catch((err) => ({ error: err.message }));
    if (!data?.success) return setRecoveryMsg({ ok: false, text: data?.error || 'Failed to reset password.' });
    setRecoveryMsg({ ok: true, text: 'Password changed. You can sign in with the new password now.' });
    setTimeout(() => {
      setRecovering(false);
      setEmail(recovery.email.trim());
    }, 1500);
  };

  const P = PORTALS[portal];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">MedBilling</h1>
          <p className="mt-1 text-xs text-muted-foreground">Clinic billing &amp; owner reports</p>
        </div>

        <div role="tablist" aria-label="Login type" className="mb-2 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
          {(Object.keys(PORTALS) as Portal[]).map((p) => {
            const Icon = PORTALS[p].icon;
            const active = portal === p;
            return (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchPortal(p)}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  active ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {PORTALS[p].label} Login
              </button>
            );
          })}
        </div>
        <p className="mb-5 text-center text-xs text-muted-foreground">{P.hint}</p>

        {error && (
          <div role="alert" className="mb-4 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Field label="Email">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={P.placeholder}
                className={`${inputCls} pl-9`}
                autoFocus
              />
            </div>
          </Field>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setRecovery({ email, code: '', password: '' });
                  setRecoveryMsg(null);
                  setRecovering(true);
                }}
                className="text-xs text-primary hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputCls} pl-9 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full ${btnPrimary}`}>
            {loading ? 'Signing in…' : `Sign in as ${P.label}`}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
          Reception logins are created by the owner in <b>Staff Logins</b>.
        </p>
      </div>

      {recovering && (
        <Modal title="Reset password with recovery code" onClose={() => setRecovering(false)}>
          <form onSubmit={handleRecovery} className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Owner only: enter the 8-character code shown when the clinic was first set up. Reception passwords are reset by the owner in Staff Logins.
            </p>
            {recoveryMsg && (
              <div className={`flex items-center gap-2 rounded-lg p-2.5 text-xs ${recoveryMsg.ok ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'}`}>
                {recoveryMsg.ok ? <Check className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
                <span>{recoveryMsg.text}</span>
              </div>
            )}
            <Field label="Owner email">
              <input type="email" value={recovery.email} onChange={(e) => setRecovery({ ...recovery, email: e.target.value })} className={inputCls} required />
            </Field>
            <Field label="Recovery code">
              <input
                type="text"
                value={recovery.code}
                onChange={(e) => setRecovery({ ...recovery, code: e.target.value.toUpperCase() })}
                className={`${inputCls} font-mono tracking-widest uppercase`}
                maxLength={8}
                required
              />
            </Field>
            <Field label="New password (min. 6)">
              <input type="password" minLength={6} value={recovery.password} onChange={(e) => setRecovery({ ...recovery, password: e.target.value })} className={inputCls} required />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setRecovering(false)} className={btnGhost}>Cancel</button>
              <button type="submit" className={btnPrimary}>Reset password</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
