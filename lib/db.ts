// lib/db.ts
// One way to reach the backend: Electron IPC in the desktop app, /api/* fetch in `next dev`.

const bridge = () => (typeof window !== 'undefined' ? (window as any).electronAPI : undefined);

function handleSignedOut(message: string) {
  if (typeof window !== 'undefined' && /sign in again/i.test(message) && !location.pathname.startsWith('/login')) {
    localStorage.removeItem('medbilling_current_user');
    location.href = '/login';
  }
}

async function post(route: string, body: any) {
  const res = await fetch(`/api/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  return res.json().catch(() => ({ error: `Request failed (${res.status})` }));
}

// Named routes (auth/*, license/*, backup/*, owner/summary). Returns the route's JSON as-is.
export async function api(route: string, body?: any): Promise<any> {
  const data = bridge()?.api ? await bridge().api(route, body) : await post(route, body);
  if (data?.error) handleSignedOut(data.error);
  return data;
}

export const db = {
  query: async (model: string, action: string, args?: any): Promise<any> => {
    const payload = { model, action, args };
    const res = bridge()?.dbQuery ? await bridge().dbQuery(payload) : await post('db', payload);
    if (res?.success) return res.data;
    handleSignedOut(res?.error || '');
    throw new Error(res?.error || 'Unknown database error');
  },
};
