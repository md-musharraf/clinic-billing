"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, HeartPulse, Shield, Eye, EyeOff, KeyRound, AlertCircle, Check } from 'lucide-react';
import { useEnterAsTab } from '@/lib/useEnterAsTab';
import { inputCls, btnPrimary, Modal, Field } from '@/components/kit';

const LAST_EMAIL_KEY = 'medbilling_last_login_email';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinicName, setClinicName] = useState('MedBilling');

  // Forgot password / recovery state
  const [recovering, setRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoverySuccess, setRecoverySuccess] = useState<string | null>(null);

  const router = useRouter();
  useEnterAsTab();

  useEffect(() => {
    localStorage.removeItem('medbilling_current_user');
    const saved = localStorage.getItem(LAST_EMAIL_KEY);
    if (saved) {
      setEmail(saved);
      document.getElementById('login-password')?.focus();
    }

    async function checkSetup() {
      try {
        let data;
        if (typeof window !== 'undefined' && (window as any).electronAPI?.authSetupStatus) {
          data = await (window as any).electronAPI.authSetupStatus();
        } else {
          const res = await fetch('/api/auth/setup-status');
          data = await res.json();
        }
        if (data?.isSetupRequired) {
          router.push('/setup');
          return;
        }
      } catch (e) {
        console.warn('Setup status check failed:', e);
      }
    }
    checkSetup();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      let data;
      if (typeof window !== 'undefined' && (window as any).electronAPI?.authLogin) {
        data = await (window as any).electronAPI.authLogin({ email: email.trim(), password });
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        data = await res.json();
      }

      if (data && data.success) {
        localStorage.setItem(LAST_EMAIL_KEY, email.trim());
        localStorage.setItem('medbilling_current_user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data?.error || 'Invalid email or password.');
      }
    } catch (err: any) {
      setError(err.message || 'Login connection failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);
    setRecoverySuccess(null);
    try {
      let data;
      if (typeof window !== 'undefined' && (window as any).electronAPI?.authRecover) {
        data = await (window as any).electronAPI.authRecover({
          email: recoveryEmail.trim(),
          recoveryCode: recoveryCode.trim(),
          newPassword,
        });
      } else {
        const res = await fetch('/api/auth/recover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: recoveryEmail.trim(),
            recoveryCode: recoveryCode.trim(),
            newPassword,
          }),
        });
        data = await res.json();
      }
      if (data && data.success) {
        setRecoverySuccess('Password reset successfully! You can now login with your new password.');
        setTimeout(() => {
          setRecovering(false);
          setEmail(recoveryEmail.trim());
        }, 2000);
      } else {
        setRecoveryError(data?.error || 'Failed to reset password.');
      }
    } catch (err: any) {
      setRecoveryError(err.message || 'Recovery request failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 shadow-2xl">
        {/* Clinic Logo & Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{clinicName}</h1>
          <p className="text-xs text-muted-foreground mt-1">Medical Clinic & Pharmacy Management</p>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Staff Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@clinic.com"
                className={`${inputCls} pl-9`}
                autoFocus
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setRecoveryEmail(email);
                  setRecovering(true);
                }}
                className="text-xs text-primary hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputCls} pl-9 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 ${btnPrimary}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-border pt-4 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Protected by Machine-Locked Offline License
          </p>
        </div>
      </div>

      {/* Forgot Password / Recovery Modal */}
      {recovering && (
        <Modal title="Reset Password with Recovery Code" onClose={() => setRecovering(false)}>
          <form onSubmit={handleRecovery} className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Enter the 8-character recovery code provided during initial setup to set a new password.
            </p>

            {recoveryError && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-2.5 text-xs text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{recoveryError}</span>
              </div>
            )}

            {recoverySuccess && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2.5 text-xs text-emerald-500">
                <Check className="h-4 w-4 shrink-0" />
                <span>{recoverySuccess}</span>
              </div>
            )}

            <Field label="Admin / Staff Email">
              <input
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="admin@clinic.com"
                className={inputCls}
                required
              />
            </Field>

            <Field label="8-Character Recovery Code">
              <input
                type="text"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                placeholder="e.g. 7A8B9C0D"
                className={`${inputCls} font-mono tracking-widest uppercase`}
                maxLength={8}
                required
              />
            </Field>

            <Field label="New Password">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter strong new password"
                className={inputCls}
                required
              />
            </Field>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRecovering(false)}
                className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                Reset Password
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
