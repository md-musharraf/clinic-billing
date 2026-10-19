-- CreateTable
CREATE TABLE "ClinicSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clinicName" TEXT NOT NULL DEFAULT 'City Medical Clinic & Pharmacy',
    "tagline" TEXT DEFAULT 'Comprehensive Health & Wellness Center',
    "address" TEXT NOT NULL DEFAULT 'Main Hospital Road, Medical Hub',
    "phone" TEXT NOT NULL DEFAULT '+91 98765 43210',
    "email" TEXT DEFAULT 'info@cityclinic.com',
    "website" TEXT DEFAULT 'www.cityclinic.com',
    "doctorName" TEXT DEFAULT 'Dr. S. K. Sharma',
    "doctorQualification" TEXT DEFAULT 'MBBS, MD (General Medicine)',
    "doctorRegNo" TEXT DEFAULT 'MCI-48291/2014',
    "dlNumber" TEXT DEFAULT 'DL-20B/21B-48190',
    "gstin" TEXT DEFAULT '07AAAAA0000A1Z5',
    "currencySymbol" TEXT NOT NULL DEFAULT '₹',
    "footerNote" TEXT DEFAULT 'Thank you for choosing our clinic. Wishing you a speedy recovery!',
    "termsConditions" TEXT DEFAULT '1. Consultation valid for 7 days. 2. Medicine returns accepted within 3 days with original bill and intact strip.',
    "logo" BLOB,
    "doctorSignature" BLOB,
    "clinicStamp" BLOB,
    "letterhead" BOOLEAN NOT NULL DEFAULT false,
    "printShowLogo" BOOLEAN NOT NULL DEFAULT true,
    "printShowSignature" BOOLEAN NOT NULL DEFAULT true,
    "printThermal" BOOLEAN NOT NULL DEFAULT false,
    "printPaperSize" TEXT NOT NULL DEFAULT 'A4',
    "printColor" TEXT NOT NULL DEFAULT '#0f766e',
    "licenseKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "recoveryHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'RECEPTIONIST',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" DATETIME,
    "avatar" BLOB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uhid" TEXT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "ageUnit" TEXT NOT NULL DEFAULT 'YEARS',
    "gender" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "bloodGroup" TEXT,
    "emergencyContact" TEXT,
    "referredDoctor" TEXT,
    "createdBy" INTEGER,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Patient_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "qualification" TEXT,
    "specialization" TEXT DEFAULT 'General Physician',
    "hospital" TEXT,
    "mobile" TEXT,
    "email" TEXT,
    "consultationFee" REAL NOT NULL DEFAULT 300,
    "commission" REAL NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CatalogItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "defaultPrice" REAL NOT NULL,
    "costPrice" REAL DEFAULT 0,
    "stock" INTEGER DEFAULT 100,
    "unit" TEXT DEFAULT 'unit',
    "taxPercent" REAL DEFAULT 0,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "billNo" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientAge" INTEGER,
    "patientGender" TEXT,
    "patientMobile" TEXT,
    "doctorName" TEXT,
    "subtotal" REAL NOT NULL,
    "discountType" TEXT NOT NULL DEFAULT 'FLAT',
    "discountValue" REAL NOT NULL DEFAULT 0,
    "discountAmount" REAL NOT NULL DEFAULT 0,
    "gstPercent" REAL NOT NULL DEFAULT 0,
    "gstAmount" REAL NOT NULL DEFAULT 0,
    "totalAmount" REAL NOT NULL,
    "paidAmount" REAL NOT NULL DEFAULT 0,
    "dueAmount" REAL NOT NULL DEFAULT 0,
    "paymentMethod" TEXT NOT NULL DEFAULT 'CASH',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PAID',
    "notes" TEXT,
    "clinicSnapshot" TEXT,
    "createdBy" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bill_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bill_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BillItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "billId" INTEGER NOT NULL,
    "itemId" INTEGER,
    "itemName" TEXT NOT NULL,
    "itemCategory" TEXT NOT NULL DEFAULT 'Medicine',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "billId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'CASH',
    "reference" TEXT,
    "receivedBy" INTEGER,
    "paidAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "License" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" TEXT NOT NULL,
    "licenseKey" TEXT,
    "status" TEXT NOT NULL DEFAULT 'TRIAL',
    "tier" TEXT NOT NULL DEFAULT 'PRO',
    "trialStartedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" DATETIME,
    "expiresAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_uhid_key" ON "Patient"("uhid");

-- CreateIndex
CREATE INDEX "Patient_name_idx" ON "Patient"("name");

-- CreateIndex
CREATE INDEX "Patient_mobile_idx" ON "Patient"("mobile");

-- CreateIndex
CREATE INDEX "Patient_registeredAt_idx" ON "Patient"("registeredAt");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogItem_code_key" ON "CatalogItem"("code");

-- CreateIndex
CREATE INDEX "CatalogItem_name_idx" ON "CatalogItem"("name");

-- CreateIndex
CREATE INDEX "CatalogItem_category_idx" ON "CatalogItem"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_billNo_key" ON "Bill"("billNo");

-- CreateIndex
CREATE INDEX "Bill_patientId_idx" ON "Bill"("patientId");

-- CreateIndex
CREATE INDEX "Bill_createdAt_idx" ON "Bill"("createdAt");

-- CreateIndex
CREATE INDEX "Bill_billNo_idx" ON "Bill"("billNo");

-- CreateIndex
CREATE INDEX "BillItem_billId_idx" ON "BillItem"("billId");

-- CreateIndex
CREATE INDEX "Payment_billId_idx" ON "Payment"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "License_machineId_key" ON "License"("machineId");

-- CreateIndex
CREATE INDEX "ActivityLog_userId_idx" ON "ActivityLog"("userId");

-- CreateIndex
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");

