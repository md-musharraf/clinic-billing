"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { homeFor } from '@/lib/roles';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('medbilling_current_user') || 'null');
      router.replace(user ? homeFor(user.role) : '/login');
    } catch {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white font-medium text-sm">
      Loading MedBilling...
    </div>
  );
}
