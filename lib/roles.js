// lib/roles.js
// Single source of truth for role-based access control (RBAC).
// Controls screens visible in the sidebar, route guards, and backend authorization.

const SCREENS = [
  '/dashboard',
  '/billing',
  '/invoices',
  '/catalog',
  '/patients',
  '/doctors',
  '/staff',
  '/backup',
  '/settings',
];

const ADMIN_ONLY_SCREENS = ['/staff', '/backup'];

/** @type {Record<string, { label: string, screens: string[], actions: string[] }>} */
const ROLES = {
  SUPER_ADMIN: {
    label: 'Clinic Owner / Director',
    screens: SCREENS,
    actions: ['*'],
  },
  ADMIN: {
    label: 'Clinic Manager',
    screens: SCREENS,
    actions: ['*'],
  },
  PHARMACIST: {
    label: 'Pharmacist / Store Head',
    screens: ['/dashboard', '/billing', '/invoices', '/catalog', '/patients', '/settings'],
    actions: ['billing', 'discount', 'patient:create', 'catalog:edit', 'settings'],
  },
  RECEPTIONIST: {
    label: 'Billing Counter / Receptionist',
    screens: ['/dashboard', '/billing', '/invoices', '/patients', '/doctors'],
    actions: ['billing', 'patient:create'],
  },
  DOCTOR: {
    label: 'Consultant Doctor',
    screens: ['/dashboard', '/patients', '/invoices', '/doctors'],
    actions: ['patient:create', 'patient:edit'],
  },
};

const STAFF_ROLES = ['ADMIN', 'PHARMACIST', 'RECEPTIONIST', 'DOCTOR'];

function parseRole(roleString) {
  const raw = String(roleString || '').trim().toUpperCase();
  const role = ROLES[raw] ? raw : 'RECEPTIONIST';
  return { role, def: ROLES[role] };
}

function isAdmin(roleString) {
  const { role } = parseRole(roleString);
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

function can(roleString, action) {
  const { def } = parseRole(roleString);
  if (!def) return false;
  if (def.actions.includes('*') || def.actions.includes(action)) return true;
  return false;
}

function canOpen(roleString, path) {
  const { def } = parseRole(roleString);
  if (!def) return false;
  return def.screens.some(s => path === s || path.startsWith(s + '/'));
}

function roleLabel(roleString) {
  return parseRole(roleString).def?.label || 'Staff';
}

module.exports = {
  SCREENS,
  ADMIN_ONLY_SCREENS,
  ROLES,
  STAFF_ROLES,
  parseRole,
  isAdmin,
  can,
  canOpen,
  roleLabel,
};
