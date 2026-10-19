// lib/db.ts
// Universal Database abstraction for Next.js and Electron IPC

function isElectron(): boolean {
  return typeof window !== 'undefined' && !!(window as any).electronAPI?.dbQuery;
}

function handleSignedOut(message: string) {
  if (typeof window !== 'undefined' && /sign in again/i.test(message) && !location.pathname.startsWith('/login')) {
    localStorage.removeItem('medbilling_current_user');
    location.href = '/login';
  }
}

export const db = {
  query: async (model: string, action: string, args?: any): Promise<any> => {
    // 1. Electron IPC mode
    if (isElectron()) {
      const response = await (window as any).electronAPI.dbQuery({ model, action, args });
      if (response?.success) return response.data;
      handleSignedOut(response?.error || '');
      throw new Error(response?.error || 'Unknown database error');
    }

    // 2. Web / Next dev API route mode
    try {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, action, args }),
      });
      const body = await response.json().catch(() => ({}));
      if (response.ok && body.success) return body.data;
      handleSignedOut(body.error || '');
      throw new Error(body.error || `Database request failed (${response.status})`);
    } catch (e: any) {
      console.error(`[db.query] ${model}.${action} error:`, e.message);
      throw e;
    }
  },
};
