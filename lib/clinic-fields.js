// lib/clinic-fields.js
// The clinic profile + invoice look, as edited in Setup and Settings and printed on every invoice.
// Shared by the backend (what may be written) and the screens.

const TEXT_FIELDS = [
  'clinicName', 'tagline', 'address', 'phone', 'email', 'website',
  'doctorName', 'doctorQualification', 'doctorRegNo', 'dlNumber', 'gstin',
  'footerNote', 'termsConditions', 'printPaperSize', 'printColor',
];
const FLAG_FIELDS = ['printShowLogo', 'printShowSignature'];
// Logo and signature travel as data-URL strings and are stored as those bytes in the BLOB columns.
const IMAGE_FIELDS = ['logo', 'doctorSignature'];

const EMPTY_CLINIC = {
  clinicName: '', tagline: '', address: '', phone: '', email: '', website: '',
  doctorName: '', doctorQualification: '', doctorRegNo: '', dlNumber: '', gstin: '',
  footerNote: 'Thank you for visiting. Get well soon!',
  termsConditions: '',
  printPaperSize: 'A4',
  printColor: '#0f766e',
  printShowLogo: true,
  printShowSignature: true,
  logo: '',
  doctorSignature: '',
};

const PAPER_SIZES = [
  { id: 'A4', label: 'A4 full page' },
  { id: 'A5', label: 'A5 half page' },
  { id: 'Thermal80', label: '80 mm receipt printer' },
];

const ACCENTS = ['#0f766e', '#0369a1', '#4338ca', '#7e22ce', '#be123c', '#c2410c', '#15803d', '#334155'];

// Keeps only profile fields, with the right types, ready for prisma.clinicSettings.
function pickClinic(input = {}) {
  const out = {};
  for (const f of TEXT_FIELDS) if (typeof input[f] === 'string') out[f] = input[f].trim();
  for (const f of FLAG_FIELDS) if (typeof input[f] === 'boolean') out[f] = input[f];
  for (const f of IMAGE_FIELDS) if (typeof input[f] === 'string') out[f] = input[f];
  if (out.printPaperSize && !PAPER_SIZES.some((p) => p.id === out.printPaperSize)) delete out.printPaperSize;
  if (out.printColor && !/^#[0-9a-f]{6}$/i.test(out.printColor)) delete out.printColor;
  return out;
}

module.exports = { TEXT_FIELDS, FLAG_FIELDS, IMAGE_FIELDS, EMPTY_CLINIC, PAPER_SIZES, ACCENTS, pickClinic };
