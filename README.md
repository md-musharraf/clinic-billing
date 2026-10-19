# 🏥 MedBilling — Clinical Desktop SaaS Application

Commercial-grade, modern, fast, and smooth desktop application for medical clinics, pharmacies, and healthcare centers. 

Built using the exact same architecture, UI system, offline licensing, and database model as **JharLab (Pathlab Software)**:
- **Desktop Shell**: Electron 44+ with custom secure `app://-` static protocol and IPC bridge
- **Frontend Stack**: Next.js 14 + React 18 + Tailwind CSS + Lucide React + Framer Motion
- **Database Engine**: Prisma ORM with SQLite (`prisma/dev.db`), offline DDL auto-sync (`prisma/schema.sql`)
- **Authentication & RBAC**: Owner, Clinic Manager, Pharmacist, Billing Counter/Receptionist, and Consultant Doctor
- **Offline SaaS Licensing**: Hardware-locked (Windows `MachineGuid`), HMAC/AES-256 signed license keys, 30-day auto trial, and admin key generator
- **Printing**: Direct Thermal Receipt (80mm/58mm) and Vector A4/A5 Tax Invoice print

---

## ⚡ Quick Start

### 1. Development Mode (Hot Reloading)
```bash
# Starts Next.js dev server on port 3000 and launches Electron window
npm run electron:dev
```

Or run purely in the browser for development:
```bash
npm run dev
# Open http://localhost:3000 in your browser
```

### 2. Production Static Export Build
```bash
npm run build
```

### 3. Package Windows Installer (.exe)
```bash
npm run electron:build
```

---

## 🚀 Key Modules & Capabilities

### 1. ⚡ Rapid Patient Billing Counter (`/billing` • F2)
- Fast keyboard-optimized clinical entry (Enter key behaves like Tab via `useEnterAsTab`).
- Live autocomplete matching 152+ pre-seeded Medicines, Lab Tests, OPD Doctor Fees, Minor Procedures, and Room Charges.
- High-frequency quick suggestion pills for 1-click addition.
- **Save to Master Catalog on the fly**: Check "Auto-save new items to Catalog" while typing any custom medicine.
- Real-time calculations: Subtotal, Flat/Percentage Discounts, GST rates (0%, 5%, 12%, 18%), and Grand Total.
- Payment modes: Cash, UPI, Card, Net Banking.

### 2. 🔐 Hardware-Locked Offline Licensing & SaaS Protection
- Tamper-proof hardware identifier derived from Windows `MachineGuid`.
- Automatic **30-Day Free Trial** on first installation.
- Live status badge in the sidebar: `🟢 PRO ACTIVE` or `🟡 TRIAL (XXd left)`.
- Built-in Developer/Admin Key Generator in Settings for offline lifetime or subscription activation keys.

### 3. 🛡️ Role-Based Access Control (RBAC) & Authentication (`/staff`)
- **SUPER_ADMIN (Owner)**: Full unrestricted access and database backup creation.
- **ADMIN (Manager)**: Full access across billing, catalog, patients, and doctors.
- **PHARMACIST**: Access to Billing, Invoices, Catalog, and Patients.
- **RECEPTIONIST**: Restricted to Billing Counter and Patient Registration.
- **DOCTOR**: Patient medical records, consultation notes, and invoice inspection.
- Emergency 8-character recovery code for password recovery.

### 4. 💊 Master Item & Price Catalog (`/catalog` • F3)
- Filter by categories: Medicine, Lab Test, Doctor Fee, Procedure, Room Charges, Ambulance, Miscellaneous.
- Selling price, cost price, stock tracking, and unit dosage.

### 5. 👥 Patient Directory (`/patients` • F6)
- Patient records with UHID, contact, age, gender, and blood group.
- Complete patient history modal showing all past invoices and treatments.

### 6. 📄 Invoices & Financial Reports (`/invoices` • F4)
- Live search by Bill No, Patient Name, or Mobile Number.
- One-click CSV transaction export for Excel/accounting.
- Reprint invoices with Clinic Letterhead, D.L. No, GSTIN, and Doctor signature blocks.

### 7. 💾 Automated Database Backups (`/backup`)
- One-click timestamped backup of the local SQLite database.
- 100% offline data isolation.
