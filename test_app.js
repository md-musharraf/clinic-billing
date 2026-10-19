const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('./prisma/client');
const api = require('./lib/server-api');
const { can, canOpen, isAdmin, roleLabel } = require('./lib/roles');

async function runTests() {
  console.log('🧪 Starting Comprehensive MedBilling Test Suite...\n');
  const prisma = new PrismaClient();
  const ctx = { prisma, dataDir: process.cwd() };

  try {
    // Test 1: Roles and Permissions
    console.log('Test 1: Verifying RBAC and screen authorization...');
    assert.strictEqual(isAdmin('SUPER_ADMIN'), true, 'SUPER_ADMIN should be admin');
    assert.strictEqual(isAdmin('ADMIN'), true, 'ADMIN should be admin');
    assert.strictEqual(isAdmin('RECEPTIONIST'), false, 'RECEPTIONIST should not be admin');
    assert.strictEqual(canOpen('RECEPTIONIST', '/billing'), true, 'Receptionist can open /billing');
    assert.strictEqual(canOpen('RECEPTIONIST', '/staff'), false, 'Receptionist cannot open /staff');
    assert.strictEqual(canOpen('SUPER_ADMIN', '/staff'), true, 'SUPER_ADMIN can open /staff');
    assert.strictEqual(roleLabel('PHARMACIST'), 'Pharmacist / Store Head');
    console.log('✅ RBAC and permissions verified successfully.\n');

    // Test 2: Hardware Fingerprint & Licensing
    console.log('Test 2: Verifying Hardware-Locked Licensing...');
    const machineId = api.getMachineId();
    assert(machineId && machineId.length > 0, 'Machine ID must be generated');
    console.log('  Detected Machine ID:', machineId);

    // Test trial check
    const lic = await api.checkLicense(prisma);
    assert(lic.valid === true, 'Trial license must be valid on boot');
    assert.strictEqual(lic.machineId, machineId, 'License machine ID must match PC');
    console.log('  Initial License Status:', lic.status, 'Days Remaining:', lic.daysRemaining);

    // Generate authenticated key
    const genRes = await api.callRoute(ctx, 'POST', 'license/generate-admin-key', {
      machineId,
      expiryDate: 'LIFETIME',
      tier: 'PRO',
    });
    assert.strictEqual(genRes.status, 200, 'Key generator should return 200');
    assert(genRes.json.key && genRes.json.key.length > 20, 'Key must be encrypted string');
    console.log('  Generated Offline Key:', genRes.json.key);

    // Activate generated key
    const actRes = await api.activateLicense(prisma, genRes.json.key);
    assert.strictEqual(actRes.success, true, 'License activation should succeed');

    const updatedLic = await api.checkLicense(prisma);
    assert.strictEqual(updatedLic.status, 'ACTIVE', 'License status should be ACTIVE');
    assert.strictEqual(updatedLic.expiryDate, 'Lifetime', 'License expiry should be Lifetime');
    console.log('✅ Offline hardware licensing verified successfully.\n');

    // Test 3: Catalog & Database Queries
    console.log('Test 3: Verifying Catalog & Master Database Items...');
    const count = await prisma.catalogItem.count();
    assert(count >= 100, `Catalog items should be at least 100 (Found: ${count})`);
    console.log(`  Found ${count} pre-seeded catalog items in SQLite dev.db.`);

    const paracetamol = await prisma.catalogItem.findFirst({
      where: { name: { contains: 'Paracetamol' } },
    });
    assert(paracetamol !== null, 'Paracetamol must exist in catalog');
    console.log(`  Sample Catalog Item: ${paracetamol.name} - ₹${paracetamol.defaultPrice}`);
    console.log('✅ Catalog database verified.\n');

    // Test 4: Clinic Profile Settings
    console.log('Test 4: Verifying Clinic Profile & Compliance Settings...');
    const settings = await prisma.clinicSettings.findFirst({ where: { id: 1 } });
    assert(settings !== null, 'Clinic settings should exist');
    assert(settings.clinicName && settings.clinicName.length > 0, 'Clinic name must be set');
    assert(settings.doctorName && settings.doctorName.length > 0, 'Doctor name must be set');
    console.log(`  Clinic: ${settings.clinicName}`);
    console.log(`  In-Charge Doctor: ${settings.doctorName}`);
    console.log(`  Pharmacy DL No: ${settings.dlNumber || 'None'}`);
    console.log(`  GSTIN: ${settings.gstin || 'None'}`);
    console.log('✅ Clinic compliance settings verified.\n');

    // Test 5: Patient Creation & Billing Flow
    console.log('Test 5: Verifying Patient Registration and Bill Generation...');
    const testPatient = await api.dbQuery(prisma, {
      model: 'patient',
      action: 'create',
      args: {
        data: {
          name: 'Suresh Chandra',
          age: 48,
          gender: 'MALE',
          mobile: '9876543210',
          referredDoctor: 'Dr. Rajesh Verma',
        },
      },
    });
    assert(testPatient.id.startsWith('MED-'), 'Patient ID should follow MED-YYYY-XXXXX format');
    console.log('  Registered Patient:', testPatient.id, testPatient.name);

    const testBill = await api.dbQuery(prisma, {
      model: 'bill',
      action: 'create',
      args: {
        data: {
          patientId: testPatient.id,
          patientName: testPatient.name,
          patientAge: testPatient.age,
          patientGender: testPatient.gender,
          patientMobile: testPatient.mobile,
          doctorName: testPatient.referredDoctor,
          subtotal: 580,
          discountType: 'FLAT',
          discountValue: 80,
          discountAmount: 80,
          gstPercent: 0,
          gstAmount: 0,
          totalAmount: 500,
          paidAmount: 500,
          dueAmount: 0,
          paymentMethod: 'CASH',
          paymentStatus: 'PAID',
          items: {
            create: [
              { itemName: 'General OPD Consultation', itemCategory: 'Doctor Fee', quantity: 1, unitPrice: 300, total: 300 },
              { itemName: 'Paracetamol 650mg', itemCategory: 'Medicine', quantity: 10, unitPrice: 8, total: 80 },
              { itemName: 'Blood Sugar Fasting', itemCategory: 'Lab Test', quantity: 1, unitPrice: 200, total: 200 },
            ],
          },
        },
        include: { items: true },
      },
    });

    assert(testBill.billNo.startsWith('MED-BIL-'), 'Bill No must start with MED-BIL-');
    assert.strictEqual(testBill.totalAmount, 500, 'Grand total must be 500');
    assert.strictEqual(testBill.items.length, 3, 'Must contain 3 bill items');
    assert(testBill.clinicSnapshot !== null, 'Clinic snapshot must be preserved for audit');
    console.log('  Generated Invoice:', testBill.billNo, 'Total: ₹' + testBill.totalAmount, 'Items:', testBill.items.length);
    console.log('✅ Billing calculation and invoice generation verified.\n');

    // Test 6: Auth Setup & Login Flow
    console.log('Test 6: Verifying Authentication & User Setup...');
    const setupStatus = await api.callRoute(ctx, 'GET', 'auth/setup-status');
    console.log('  Setup Required:', setupStatus.json.isSetupRequired);

    if (setupStatus.json.isSetupRequired) {
      const setupRes = await api.callRoute(ctx, 'POST', 'auth/setup', {
        name: 'Dr. Rajesh Verma',
        email: 'owner@arogyaclinic.com',
        password: 'SecureClinicPass2026!',
        clinicName: 'Arogya Medical Clinic & Pharmacy',
        doctorName: 'Dr. Rajesh Verma',
        phone: '+91 98765 43210',
        dlNumber: 'DL-20B/21B-89234',
        gstin: '20AABCU9603R1ZM',
      });
      assert.strictEqual(setupRes.status, 200, 'Setup should return 200');
      assert(setupRes.json.recoveryCode, 'Recovery code must be returned');
      console.log('  Setup Completed! Generated Recovery Code:', setupRes.json.recoveryCode);
    } else {
      console.log('  Admin already setup from previous test run. Testing security lock and login...');
      const blockedSetup = await api.callRoute(ctx, 'POST', 'auth/setup', {
        name: 'Attacker',
        email: 'attacker@evil.com',
        password: 'password123',
      });
      assert.strictEqual(blockedSetup.status, 400, 'Duplicate setup must be blocked with 400');
      console.log('  Duplicate setup correctly blocked with 400.');
    }

    // Test Login
    const loginRes = await api.callRoute(ctx, 'POST', 'auth/login', {
      email: 'owner@arogyaclinic.com',
      password: 'SecureClinicPass2026!',
    });
    assert.strictEqual(loginRes.status, 200, 'Login should return 200');
    assert.strictEqual(loginRes.json.user.role, 'SUPER_ADMIN', 'Owner must have SUPER_ADMIN role');
    console.log('  Login successful for user:', loginRes.json.user.name, 'Role:', loginRes.json.user.role);
    console.log('✅ Authentication and setup verified.\n');

    // Test 7: Database Backup
    console.log('Test 7: Verifying Database Backup...');
    const backupRes = await api.callRoute(ctx, 'POST', 'backup/export');
    assert.strictEqual(backupRes.status, 200, 'Backup export should return 200');
    assert(fs.existsSync(backupRes.json.file), 'Backup file must exist on disk');
    console.log('  Created Backup File:', backupRes.json.fileName, 'Size:', backupRes.json.size, 'bytes');
    console.log('✅ Database backup verified.\n');

    console.log('🎉 ALL 7 TEST SUITES PASSED WITH 100% SUCCESS!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
