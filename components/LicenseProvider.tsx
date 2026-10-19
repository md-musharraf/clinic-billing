"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { KeyRound, Copy, Check, AlertCircle, Sparkles, ShieldAlert, Cpu } from 'lucide-react';
import { inputCls, btnPrimary } from '@/components/kit';

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

  // Activation modal state
  const [keyInput, setKeyInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchLicense = async () => {
    try {
      let data: any;
      if (typeof window !== 'undefined' && (window as any).electronAPI?.licenseCheck) {
        data = await (window as any).electronAPI.licenseCheck();
      } else {
        const res = await fetch('/api/license/check');
        data = await res.json();
      }

      if (data) {
        setMachineId(data.machineId || '');
        setExpiryDate(data.expiryDate || null);
        setStatus(data.status || 'TRIAL');
        setTier(data.tier || 'PRO');
        setDaysRemaining(data.daysRemaining ?? 30);
        setIsValid(data.valid !== false);
      }
    } catch (e) {
      console.warn('Failed to check license:', e);
    } finally {
      setChecked(true);
    }
  };

  useEffect(() => {
    fetchLicense();
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
      let res: any;
      if (typeof window !== 'undefined' && (window as any).electronAPI?.licenseActivate) {
        res = await (window as any).electronAPI.licenseActivate(keyInput.trim());
      } else {
        const fetchRes = await fetch('/api/license/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ licenseKey: keyInput.trim() }),
        });
        res = await fetchRes.json();
      }

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
                <h2 className="text-xl font-bold tracking-tight text-foreground">License Expired</h2>
                <p className="text-xs text-muted-foreground">30-Day Trial or Subscription Ended</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Your free trial period has concluded. To continue using MedBilling, please activate your copy with a valid license key.
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
