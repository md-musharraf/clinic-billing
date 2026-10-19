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

export function useRole(): string | null {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('medbilling_current_user') || 'null');
      setRole(u?.role || null);
    } catch {}
  }, []);
  return role;
}

export function useLive(load: () => void, models?: string[]) {
  const latest = useRef(load);
  latest.current = load;
  useEffect(() => {
    latest.current();
    if (typeof window !== 'undefined' && (window as any).electronAPI?.onDbChanged) {
      return (window as any).electronAPI.onDbChanged((model: string) => {
        if (!models || models.includes(model)) latest.current();
      });
    }
  }, [models]);
}

export async function postApi(route: string, body?: any) {
  if (typeof window !== 'undefined' && (window as any).electronAPI) {
    if (route === 'auth/logout') return { success: true };
  }
  const res = await fetch(`/api/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}
