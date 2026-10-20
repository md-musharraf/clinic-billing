# 🏥 MedBilling — Clinical Desktop SaaS Application

Commercial-grade, modern, fast, and smooth desktop application for medical clinics, pharmacies, and healthcare centers. 

Built using the exact same architecture, UI system, offline licensing, and database model as **JharLab (Pathlab Software)**:
- **Desktop Shell**: Electron 44+ with custom secure `app://-` static protocol and IPC bridge
- **Frontend Stack**: Next.js 14 + React 18 + Tailwind CSS + Lucide React + Framer Motion
- **Database Engine**: Prisma ORM with SQLite (`prisma/dev.db`), offline DDL auto-sync (`prisma/schema.sql`)
- **Authentication & RBAC**: separate **Owner** and **Reception** logins (Owner/Manager → owner dashboard; Reception, Pharmacist, Doctor → counter dashboard), enforced by a backend session
- **Licensing**: hardware-locked (Windows `MachineGuid`), 7-day auto trial, keys + pause/stop from the admin dashboard
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

### 4. Release an update (clinics update by themselves)
Bump `version` in package.json, commit, then tag and push:
```bash
git tag v1.0.1
```
```bash
git push origin main v1.0.1
```
`.github/workflows/release.yml` builds, runs `npm test`, and publishes `MedBilling-Setup-<version>.exe` + `latest.yml`
as a GitHub Release of md-musharraf/clinic-billing (public, so no token in the app). Installed apps check at start and
every 4 hours, download in the background, and show **Update ready** (installs on close or "Restart now"). Before a new
version first opens the database, a copy is saved in `backups/medbilling-preupdate-<old>-to-<new>-*.db`.
Clinics on a version without the updater install the next version by hand once.

---

## 🚀 Key Modules & Capabilities

### First run (`/setup`)
A new PC opens a 4-step setup: clinic details → doctor & tax (GSTIN / drug licence optional) → bill design
(logo, doctor's signature, colour, A4 / A5 / 80 mm receipt, thank-you line, terms, with a live preview) → owner login.
It ends with the owner recovery code and the Machine ID to send for a licence. The owner dashboard then shows a
"Get your clinic ready" checklist (doctors, prices, reception login, first bill). Everything is editable later in Settings.

### New Bill (`/billing` • F2, F9 saves)
One screen, no page scrolling: patient, item search, item list (the only part that scrolls; the newest line comes into
view), per-type totals, discount, GST, payment and Save. Typing a mobile or name lists existing patients (family members
on one number too); Patients → **Bill** opens it with the patient already picked. ↑↓ + Enter add items from the
catalog; an unknown item gets its category guessed and the cursor goes to its price.

### 0. 👑 Owner Dashboard (`/owner`, Owner login only)
- Pick Today / Yesterday / This week / This month / Last month or any date range.
- Patients (unique + new registrations), bills, money collected, due, discount, GST.
- Money split into **Lab Tests, Medicine, Doctor Fee, Ultrasound, X-Ray, Other**; doctor-wise, payment-mode and day-wise totals.
- Patient-wise billing table (every bill split by fee type, discount, GST, paid, due) with search and invoice preview.
- **Download PDF**: the same report as an A4-landscape PDF, made on demand on this PC.

### 1. ⚡ Rapid Patient Billing Counter (`/billing` • F2)
- Fast keyboard-optimized clinical entry (Enter key behaves like Tab via `useEnterAsTab`).
- Live autocomplete matching 152+ pre-seeded Medicines, Lab Tests, OPD Doctor Fees, Minor Procedures, and Room Charges.
- High-frequency quick suggestion pills for 1-click addition.
- **Save to Master Catalog on the fly**: Check "Auto-save new items to Catalog" while typing any custom medicine.
- Real-time calculations: Subtotal, Flat/Percentage Discounts, GST rates (0%, 5%, 12%, 18%), and Grand Total.
- Payment modes: Cash, UPI, Card, Net Banking.

### 2. 🔐 Licence (managed from the JharLab admin dashboard)
- Locked to the PC's Windows `MachineGuid`; automatic **7-day free trial** on first run.
- Keys are made only on the admin dashboard (customer → Software: **MedBilling Clinic**); they end in `|MEDBILLING`,
  so JharLab and MedBilling keys cannot unlock each other. The app has no key generator.
- Every check (and once a minute while open) the app calls the same `GET /api/license/status` as JharLab, with
  `product=medbilling`: pause / stop / delete on the dashboard lock the PC, a renewed key installs itself.
  Without internet the last answer is kept. `NEXT_PUBLIC_ADMIN_DASHBOARD_URL` overrides the dashboard address.

### 3. 🛡️ Logins & Roles (`/staff`, rules in `lib/roles.js`)
- **SUPER_ADMIN (Owner)** / **ADMIN (Manager)**: Owner login, owner dashboard, staff, backup, settings.
- **RECEPTIONIST**: Reception login, today's counter, billing, invoices, patients.
- **PHARMACIST**, **DOCTOR**: Reception login with their own screen lists.
- The backend refuses DB access without a signed-in session; only owners can change logins, licences, make backups,
  delete bills or delete patients. A deleted patient is hidden from Patients and billing search; their bills stay in reports.
- Owner sets new staff passwords in Staff Logins; the owner's own reset uses the 8-character recovery code from setup.

### 4. 💊 Master Item & Price Catalog (`/catalog` • F3)
- Filter by categories: Medicine, Lab Test, Doctor Fee, Procedure, Room Charges, Ambulance, Miscellaneous.
- Selling price, cost price, stock tracking, and unit dosage.

### 5. 👥 Patient Directory (`/patients` • F6)
- Patient records with UHID, contact, age, gender, and blood group.
- Complete patient history modal showing all past invoices and treatments.

### Admitted patients (`/ipd` • F7)
- **Admit**: existing or new patient, room type from the catalog's Room Charges (rate per 24 h), bed no., doctor,
  reason, optional advance deposit. Number `IPD-<year>-0001`.
- **During the stay**: add charges any day (they are listed day-wise); bed days count by themselves (every started
  24 h, at least one). Take deposits as often as needed; each prints a receipt `RCPT-<date>-0001`.
- **Running bill** any time (marked RUNNING BILL, not final) with deposits and the balance or advance.
- **Discharge**: one final bill for the whole stay: dated lines, bed days (editable), discount, GST, every deposit,
  and what is collected now (or refunded as a negative amount). A patient can also pay everything at discharge.
- Reception can remove a charge only on the day it was added; deleting deposits, changing the bed rate and cancelling
  an admission are owner-only (enforced in `lib/ipd.js`).
- Owner dashboard counts IPD money on the day each deposit came in and shows who is admitted right now.

### Printing a bill
**Print** opens the Windows print dialog (A4, A5 or 80 mm receipt, as chosen in Settings). **Download PDF** saves the
same page as `Documents\MedBilling Bills\<bill no>.pdf` and offers to open it: the way out when no printer works.

### 6. 📄 Invoices & Financial Reports (`/invoices` • F4)
- Live search by Bill No, Patient Name, or Mobile Number.
- One-click CSV transaction export for Excel/accounting.
- Reprint invoices with Clinic Letterhead, D.L. No, GSTIN, and Doctor signature blocks.

### 7. ✅ Tests
```bash
npm test          # owner-report maths, roles, licence vs a fake dashboard, setup + delete rules
node test_app.js  # end-to-end against prisma/dev.db
```

### 8. 💾 Automated Database Backups (`/backup`)
- One-click timestamped backup of the local SQLite database.
- 100% offline data isolation.
