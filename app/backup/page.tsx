"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import {
  Database,
  Download,
  Upload,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { btnPrimary, btnGhost, card, useToast, ToastView } from '@/components/kit';

export default function BackupPage() {
  const [toast, showToast] = useToast();
  const [loading, setLoading] = useState(false);
  const [lastBackup, setLastBackup] = useState<any | null>(null);

  const handleExportBackup = async () => {
    setLoading(true);
    try {
      let res: any;
      if (typeof window !== 'undefined' && (window as any).electronAPI?.backupExport) {
        res = await (window as any).electronAPI.backupExport();
      } else {
        const fetchRes = await fetch('/api/backup/export', { method: 'POST' });
        res = await fetchRes.json();
      }

      if (res.success) {
        setLastBackup(res);
        showToast('Backup created successfully!', 'success');
      } else {
        showToast(res.error || 'Failed to create backup', 'error');
      }
    } catch (e: any) {
      showToast(e.message || 'Backup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      title="Database Backup & Data Safety"
      subtitle="Create automated timestamped backups of your SQLite clinic database"
    >
      <ToastView toast={toast} />

      <div className="max-w-4xl space-y-6">
        {/* Main Backup Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
              <HardDrive className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">One-Click Database Backup</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Saves a complete snapshot of all patient records, invoices, item catalogs, and staff logins into a timestamped file in your backups directory.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-muted/40 p-4 border border-border space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              100% Offline & Isolated
            </div>
            <p className="text-muted-foreground">
              Your patient and financial data never leaves your computer. Backups can be copied to external USB flash drives or external hard drives for disaster recovery.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              disabled={loading}
              className={btnPrimary}
            >
              <Download className="h-4 w-4" />
              {loading ? 'Creating Backup...' : 'Create Backup Now'}
            </button>
          </div>

          {lastBackup && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-emerald-500" />
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Backup Created: {lastBackup.fileName}
                  </span>
                  <span className="text-[11px] text-muted-foreground block truncate max-w-lg">
                    Location: {lastBackup.file}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {(lastBackup.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
