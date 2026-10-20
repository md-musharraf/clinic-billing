"use client";
import { Sidebar, navItems } from '@/components/Sidebar';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEnterAsTab } from '@/lib/useEnterAsTab';
import { canOpen, homeFor } from '@/lib/roles';
import { Sun, Moon } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const THEME_KEY = 'medbilling_theme';

export function AppLayout({ children, title, subtitle, actions }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [role, setRole] = useState<string | null>(null);

  useEnterAsTab();

  // Auth guard: signed out → login; screen not allowed for this role → that role's home.
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('medbilling_current_user') || 'null');
      if (!u) return router.replace('/login');
      setRole(u.role);
      if (!canOpen(u.role, pathname)) router.replace(homeFor(u.role));
    } catch {
      router.replace('/login');
    }
  }, [pathname, router]);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  // Function-key shortcuts come from the sidebar, limited to screens this role can open.
  const shortcuts = useMemo(() => (role ? navItems.filter((n) => n.shortcut && canOpen(role, n.href)) : []), [role]);
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const hit = shortcuts.find((n) => n.shortcut === e.key);
      if (hit) {
        e.preventDefault();
        router.push(hit.href);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, shortcuts]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-card px-6 py-2 shadow-sm no-print">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-foreground leading-tight">{title}</h1>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {actions}

            {shortcuts.length > 0 && (
              <div className="hidden xl:flex items-center gap-2 text-xs text-muted-foreground border-l border-border pl-4">
                {shortcuts.map((n) => (
                  <span key={n.href} className="flex items-center gap-1"><kbd>{n.shortcut}</kbd> {n.name}</span>
                ))}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              title="Toggle dark / light mode"
              aria-label="Toggle dark / light mode"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
