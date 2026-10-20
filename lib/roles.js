// lib/roles.js
// Single source of truth for role-based access control (RBAC).
// Controls screens visible in the sidebar, route guards, login portals and backend authorization.

// Owner + manager: every screen.
const OWNER_SCREENS = [
  '/owner',
  '/dashboard',
  '/billing',
  '/invoices',
  '/patients',
  '/catalog',
  '/doctors',
  '/staff',
  '/backup',
  '/settings',
];

/** @type {Record<string, { label: string, screens: string[], actions: string[] }>} */
const ROLES = {
  SUPER_ADMIN: {
    label: 'Clinic Owner',
    screens: OWNER_SCREENS,
    actions: ['*'],
  },
  ADMIN: {
    label: 'Clinic Manager',
    screens: OWNER_SCREENS,
    actions: ['*'],
  },
  PHARMACIST: {
    label: 'Pharmacist / Store Head',
    screens: ['/dashboard', '/billing', '/invoices', '/catalog', '/patients', '/settings'],
    actions: ['billing', 'discount', 'patient:create', 'catalog:edit', 'settings'],
  },
  RECEPTIONIST: {
    label: 'Reception / Billing Counter',
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

// Owner + manager use the Owner login and the owner dashboard; everyone else uses Reception.
function isAdmin(roleString) {
  const { role } = parseRole(roleString);
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

function can(roleString, action) {
  const { def } = parseRole(roleString);
  return def.actions.includes('*') || def.actions.includes(action);
}

function canOpen(roleString, path) {
  const { def } = parseRole(roleString);
  return def.screens.some(s => path === s || path.startsWith(s + '/'));
}

function roleLabel(roleString) {
  return parseRole(roleString).def.label;
}

// First screen after login.
function homeFor(roleString) {
  return isAdmin(roleString) ? '/owner' : '/dashboard';
}

module.exports = {
  ROLES,
  STAFF_ROLES,
  parseRole,
  isAdmin,
  can,
  canOpen,
  roleLabel,
  homeFor,
};
