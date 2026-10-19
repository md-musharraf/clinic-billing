"use client";
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEnterAsTab } from '@/lib/useEnterAsTab';
import { canOpen } from '@/lib/roles';
import { Sun, Moon, Bell, Search, ShieldAlert, Sparkles, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const SHORTCUTS: Record<string, string> = {
  F2: '/billing',
  F3: '/catalog',
  F4: '/invoices',
  F6: '/patients',
};

export function AppLayout({ children, title, subtitle, actions }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Activate keyboard Enter navigation globally
  useEnterAsTab();

  // Keyboard shortcut listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (SHORTCUTS[e.key]) {
        e.preventDefault();
        router.push(SHORTCUTS[e.key]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Auth Guard
  useEffect(() => {
    try {
      const stored = localStorage.getItem('medbilling_current_user');
      if (!stored && !pathname.startsWith('/login') && !pathname.startsWith('/setup')) {
        router.push('/login');
        return;
      }
      if (stored) {
        const u = JSON.parse(stored);
        if (!canOpen(u.role, pathname)) {
          router.push('/dashboard');
        }
      }
    } catch {
      router.push('/login');
    }
  }, [pathname, router]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-sm no-print">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {actions}

            {/* Quick Shortcut Pills */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground mr-2 border-r border-border pr-4">
              <span className="flex items-center gap-1"><kbd>F2</kbd> Bill</span>
              <span className="flex items-center gap-1"><kbd>F3</kbd> Items</span>
              <span className="flex items-center gap-1"><kbd>F4</kbd> Invoices</span>
              <span className="flex items-center gap-1"><kbd>F6</kbd> Patients</span>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              title="Toggle Dark / Light Mode"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </header>

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
