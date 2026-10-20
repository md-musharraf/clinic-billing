"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export const inputCls = 'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all';
export const labelCls = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground';
export const btnPrimary = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 cursor-pointer';
export const btnGhost = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.98] disabled:opacity-50 cursor-pointer';
export const btnDanger = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-destructive px-4 text-sm font-semibold text-destructive-foreground shadow-sm transition-all hover:bg-destructive/90 active:scale-[0.98] disabled:opacity-50 cursor-pointer';
export const card = 'rounded-xl border border-border bg-card shadow-sm p-5';
export const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/40';
export const td = 'px-4 py-3 text-sm border-t border-border/50';

export function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export function Modal({
  title,
  onClose,
  children,
  footer,
  wide
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={e => e.stopPropagation()}
        className={`max-h-[92vh] w-full overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl ${wide ? 'max-w-4xl' : 'max-w-xl'}`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-border/60 pb-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
        {footer && <div className="mt-6 flex justify-end gap-3 border-t border-border/60 pt-4">{footer}</div>}
      </div>
    </div>
  );
}

export type Toast = { message: string; type: 'success' | 'error' } | null;

export function useToast(): [Toast, (message: string, type?: 'success' | 'error') => void] {
  const [toast, setToast] = useState<Toast>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  return [toast, useCallback((message: string, type: 'success' | 'error' = 'success') => setToast({ message, type }), [])];
}

export function ToastView({ toast }: { toast: Toast }) {
  if (!toast) return null;
  return (
    <div role="status" className={`toast-global ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
      {toast.message}
    </div>
  );
}

// The signed-in user (id, name, email, role) saved at login; null until read.
export function useUser(): { id: number; name: string; email: string; role: string } | null {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('medbilling_current_user') || 'null'));
    } catch {}
  }, []);
  return user;
}

// Runs load() now, whenever deps change, and whenever the desktop app reports a write to one of `models`.
export function useLive(load: () => void, models: string[], deps: unknown[] = []) {
  const latest = useRef(load);
  latest.current = load;
  const key = models.join(',');
  useEffect(() => {
    latest.current();
    return (window as any).electronAPI?.onDbChanged?.((model: string) => {
      if (key.split(',').includes(model)) latest.current();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...deps]);
}

export function printPage() {
  const bridge = (window as any).electronAPI;
  if (bridge?.printReceipt) bridge.printReceipt();
  else window.print();
}

// Number tile used on both dashboards.
export function Stat({ label, value, hint, icon: Icon, tone = 'primary' }: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon: React.ElementType;
  tone?: 'primary' | 'emerald' | 'indigo' | 'amber' | 'rose' | 'sky';
}) {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    indigo: 'bg-indigo-500/10 text-indigo-600',
    amber: 'bg-amber-500/10 text-amber-600',
    rose: 'bg-rose-500/10 text-rose-600',
    sky: 'bg-sky-500/10 text-sky-600',
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-foreground tabular-nums">{value}</div>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
