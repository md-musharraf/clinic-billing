"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { canOpen, roleLabel, homeFor } from '@/lib/roles';
import { api, db } from '@/lib/db';
import { useLicense } from '@/components/LicenseProvider';
import {
  BarChart3,
  BedDouble,
  LayoutDashboard,
  Receipt,
  FileText,
  Users,
  Package,
  Stethoscope,
  Shield,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  HeartPulse,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  shortcut?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Owner Dashboard', href: '/owner', icon: BarChart3 },
      { name: 'Today at Counter', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'BILLING',
    items: [
      { name: 'New Bill', href: '/billing', icon: Receipt, shortcut: 'F2' },
      { name: 'Admitted (IPD)', href: '/ipd', icon: BedDouble, shortcut: 'F7' },
      { name: 'Invoices', href: '/invoices', icon: FileText, shortcut: 'F4' },
      { name: 'Patients', href: '/patients', icon: Users, shortcut: 'F6' },
    ],
  },
  {
    title: 'MASTERS',
    items: [
      { name: 'Item & Fee Catalog', href: '/catalog', icon: Package, shortcut: 'F3' },
      { name: 'Doctors', href: '/doctors', icon: Stethoscope },
    ],
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { name: 'Staff Logins', href: '/staff', icon: Shield },
      { name: 'Data Backup', href: '/backup', icon: Database },
      { name: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export const navItems = navSections.flatMap((s) => s.items);

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; email?: string } | null>(null);
  const license = useLicense();
  const [clinicName, setClinicName] = useState('');

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('medbilling_current_user') || 'null'));
    } catch {}
    db.query('clinicSettings', 'findFirst', { where: { id: 1 }, select: { clinicName: true } })
      .then((c) => setClinicName(c?.clinicName || ''))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('medbilling_current_user');
    await api('auth/logout').catch(() => {});
    router.push('/login');
  };

  const userRole = user?.role || 'RECEPTIONIST';

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-border bg-card transition-all duration-300 z-30 select-none shadow-sm',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Clinic Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed ? (
          <Link href={homeFor(userRole)} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-foreground block leading-tight">MedBilling</span>
              <span className="block max-w-[150px] truncate text-[11px] font-medium text-muted-foreground" title={clinicName}>{clinicName || 'Clinic billing'}</span>
            </div>
          </Link>
        ) : (
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <HeartPulse className="h-6 w-6" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {navSections.map((sec) => {
          const visibleItems = user ? sec.items.filter((item) => canOpen(userRole, item.href)) : [];
          if (visibleItems.length === 0) return null;

          return (
            <div key={sec.title}>
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {sec.title}
                </div>
              )}
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all group relative',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-semibold'
                          : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      )}
                      title={collapsed ? `${item.name} (${item.shortcut || ''})` : undefined}
                    >
                      <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground')} />
                      {!collapsed && (
                        <div className="flex flex-1 items-center justify-between overflow-hidden">
                          <span className="truncate">{item.name}</span>
                          {item.shortcut && (
                            <kbd className={cn('text-[10px] px-1.5 py-0.5 rounded border', isActive ? 'bg-primary-foreground/20 text-primary-foreground border-transparent' : 'bg-muted border-border text-muted-foreground')}>
                              {item.shortcut}
                            </kbd>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* License Status Pill */}
      {!collapsed && license.machineId && (
        <div className="px-3 py-2 mx-3 mb-2 rounded-xl bg-muted/60 border border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              {license.status === 'ACTIVE' ? 'PRO ACTIVE' : `TRIAL (${license.daysRemaining}d left)`}
            </span>
          </div>
          <span className={cn('h-2 w-2 rounded-full', license.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')} />
        </div>
      )}

      {/* User Info & Logout Footer */}
      <div className="border-t border-border p-3">
        <div className={cn('flex items-center gap-3', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{user?.name || ''}</p>
              <p className="truncate text-xs text-muted-foreground">{user && roleLabel(userRole)}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="rounded-xl p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
