"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { KeyRound, Copy, Check, AlertCircle, Sparkles, ShieldAlert, Cpu } from 'lucide-react';
import { inputCls, btnPrimary } from '@/components/kit';
import { api } from '@/lib/db';

interface LicenseContextType {
  machineId: string;
  expiryDate: string | null;
  status: string;
  tier: string;
  daysRemaining: number;
  isValid: boolean;
  triggerRecheck: () => Promise<void>;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export function useLicense() {
  const context = useContext(LicenseContext);
  if (!context) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
}

export function LicenseProvider({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [machineId, setMachineId] = useState('');
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [status, setStatus] = useState('TRIAL');
  const [tier, setTier] = useState('PRO');
  const [daysRemaining, setDaysRemaining] = useState(30);
  const [reason, setReason] = useState<string | null>(null);

  // Activation modal state
  const [keyInput, setKeyInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchLicense = async () => {
    try {
      const data = await api('license/check');
      if (data) {
        setMachineId(data.machineId || '');
        setExpiryDate(data.expiryDate || null);
        setStatus(data.status || 'TRIAL');
        setTier(data.tier || 'PRO');
        setDaysRemaining(data.daysRemaining ?? 30);
        setIsValid(data.valid !== false);
        setReason(data.reason || null);
      }
    } catch (e) {
      console.warn('Failed to check license:', e);
    } finally {
      setChecked(true);
    }
  };

  // The backend asks the admin dashboard each time, so a pause/stop/renewal there applies within a minute.
  useEffect(() => {
    fetchLicense();
    const timer = setInterval(fetchLicense, 60_000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(machineId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!keyInput.trim()) {
      setError('Please enter a license key');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api('license/activate', { licenseKey: keyInput.trim() });

      if (res.success) {
        setSuccess(true);
        setTimeout(async () => {
          await fetchLicense();
          setSuccess(false);
          setKeyInput('');
        }, 1500);
      } else {
        setError(res.error || 'Failed to activate license');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LicenseContext.Provider
      value={{
        machineId,
        expiryDate,
        status,
        tier,
        daysRemaining,
        isValid,
        triggerRecheck: fetchLicense,
      }}
    >
      {children}

      {/* Forced Lockout Modal if license is expired */}
      {checked && !isValid && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="max-w-md w-full rounded-2xl border border-destructive/40 bg-card p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-destructive mb-4">
              <ShieldAlert className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {status === 'EXPIRED' ? 'Licence expired' : 'Licence locked'}
                </h2>
                <p className="text-xs text-muted-foreground">Your billing data on this PC is safe</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {reason || 'Please activate MedBilling with a licence key.'} Send the Machine ID below to your administrator;
              once they activate or renew it on their dashboard, this screen unlocks by itself (or paste the key they send).
            </p>

            <div className="rounded-xl bg-muted/60 border border-border p-3.5 mb-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" /> Hardware Machine ID:
                </span>
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center gap-1 text-primary hover:underline cursor-pointer font-semibold"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy ID'}
                </button>
              </div>
              <code className="text-xs font-mono font-bold text-foreground block break-all select-all">
                {machineId}
              </code>
            </div>

            <form onSubmit={handleActivate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  License Key
                </label>
                <input
                  type="text"
                  placeholder="Paste license key here..."
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  className={inputCls}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 p-2.5 rounded-lg">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>License activated successfully! Reloading...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full ${btnPrimary}`}
              >
                <KeyRound className="h-4 w-4" />
                {submitting ? 'Verifying...' : 'Activate License'}
              </button>
            </form>
          </div>
        </div>
      )}
    </LicenseContext.Provider>
  );
}
