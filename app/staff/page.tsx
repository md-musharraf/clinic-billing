"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatDateTime } from '@/lib/utils';
import { roleLabel, STAFF_ROLES } from '@/lib/roles';
import {
  Shield,
  Plus,
  Trash2,
  KeyRound,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Lock,
} from 'lucide-react';
import { inputCls, labelCls, btnPrimary, btnGhost, card, th, td, Modal, Field, useToast, ToastView } from '@/components/kit';

export default function StaffPage() {
  const [toast, showToast] = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('RECEPTIONIST');
  const [password, setPassword] = useState('');
  const [resetFor, setResetFor] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await db.query('user', 'findMany', {
        orderBy: { createdAt: 'desc' },
      });
      setUsers(data || []);
    } catch (e: any) {
      showToast(e.message || 'Failed to load staff accounts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      await db.query('user', 'create', {
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          role,
          password,
        },
      });

      showToast(`User ${name} created successfully!`, 'success');
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setPassword('');
      loadUsers();
    } catch (e: any) {
      showToast(e.message || 'Failed to create staff user', 'error');
    }
  };

  const toggleStatus = async (user: any) => {
    if (user.role === 'SUPER_ADMIN') {
      showToast('Master Owner account cannot be deactivated', 'error');
      return;
    }
    try {
      await db.query('user', 'update', {
        where: { id: user.id },
        data: { isActive: !user.isActive },
      });
      showToast(`User status updated`, 'success');
      loadUsers();
    } catch (e: any) {
      showToast(e.message || 'Failed to update user', 'error');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return showToast('Password must be at least 6 characters', 'error');
    try {
      await db.query('user', 'update', { where: { id: resetFor.id }, data: { password: newPassword } });
      showToast(`New password set for ${resetFor.name}`, 'success');
      setResetFor(null);
      setNewPassword('');
    } catch (e: any) {
      showToast(e.message || 'Failed to reset password', 'error');
    }
  };

  const handleDelete = async (user: any) => {
    if (user.role === 'SUPER_ADMIN') {
      showToast('Master Owner account cannot be deleted', 'error');
      return;
    }
    if (!confirm(`Are you sure you want to delete user ${user.name}?`)) return;

    try {
      await db.query('user', 'delete', { where: { id: user.id } });
      showToast('User deleted', 'success');
      loadUsers();
    } catch (e: any) {
      showToast(e.message || 'Failed to delete user', 'error');
    }
  };

  return (
    <AppLayout
      title="Staff & Role Management"
      subtitle="Manage internal clinic logins, reception counters, pharmacist accounts, and permissions"
      actions={
        <button onClick={() => setIsModalOpen(true)} className={btnPrimary}>
          <Plus className="h-4 w-4" />
          + Create Staff Login
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr>
                  <th className={th}>Staff Name</th>
                  <th className={th}>Email / Username</th>
                  <th className={th}>Designation Role</th>
                  <th className={th}>Status</th>
                  <th className={th}>Last Login</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className={`${td} font-bold text-foreground text-sm flex items-center gap-2`}>
                      <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {u.name[0]}
                      </div>
                      {u.name}
                    </td>
                    <td className={`${td} font-medium text-muted-foreground`}>{u.email}</td>
                    <td className={td}>
                      <span className="inline-block px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-primary/10 text-primary">
                        {roleLabel(u.role)}
                      </span>
                    </td>
                    <td className={td}>
                      <button
                        onClick={() => toggleStatus(u)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          u.isActive
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {u.isActive ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {u.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className={`${td} text-muted-foreground`}>
                      {u.lastLogin ? formatDateTime(u.lastLogin) : 'Never'}
                    </td>
                    <td className={`${td} text-right whitespace-nowrap`}>
                      <button
                        onClick={() => setResetFor(u)}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                        title="Set a new password"
                        aria-label={`Set a new password for ${u.name}`}
                      >
                        <KeyRound className="h-4 w-4" />
                      </button>
                      {u.role !== 'SUPER_ADMIN' && (
                        <button
                          onClick={() => handleDelete(u)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {resetFor && (
        <Modal title={`New password for ${resetFor.name}`} onClose={() => setResetFor(null)}>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Field label="New password (min. 6 chars)">
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputCls} autoFocus required minLength={6} />
            </Field>
            <p className="text-xs text-muted-foreground">Tell {resetFor.name} the new password. They sign in with {resetFor.email}.</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button type="button" onClick={() => setResetFor(null)} className={btnGhost}>Cancel</button>
              <button type="submit" className={btnPrimary}>Save password</button>
            </div>
          </form>
        </Modal>
      )}

      {isModalOpen && (
        <Modal title="Create New Staff Account" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <Field label="Staff Member Name *">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className={inputCls}
                required
              />
            </Field>

            <Field label="Login Email *">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@clinic.com"
                className={inputCls}
                required
              />
            </Field>

            <Field label="Role & Permissions *">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={inputCls}
              >
                <option value="RECEPTIONIST">Reception (Reception login: billing, patients, today's counter)</option>
                <option value="PHARMACIST">Pharmacist (Billing, Invoices & Catalog)</option>
                <option value="DOCTOR">Consultant Doctor (Patients & Invoices)</option>
                <option value="ADMIN">Clinic Manager (Owner login: full access + owner dashboard)</option>
              </select>
            </Field>

            <Field label="Password (Min. 6 chars) *">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
                required
              />
            </Field>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={btnGhost}
              >
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                Create User
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AppLayout>
  );
}
