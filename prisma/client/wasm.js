
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.ClinicSettingsScalarFieldEnum = {
  id: 'id',
  clinicName: 'clinicName',
  tagline: 'tagline',
  address: 'address',
  phone: 'phone',
  email: 'email',
  website: 'website',
  doctorName: 'doctorName',
  doctorQualification: 'doctorQualification',
  doctorRegNo: 'doctorRegNo',
  dlNumber: 'dlNumber',
  gstin: 'gstin',
  currencySymbol: 'currencySymbol',
  footerNote: 'footerNote',
  termsConditions: 'termsConditions',
  logo: 'logo',
  doctorSignature: 'doctorSignature',
  clinicStamp: 'clinicStamp',
  letterhead: 'letterhead',
  printShowLogo: 'printShowLogo',
  printShowSignature: 'printShowSignature',
  printThermal: 'printThermal',
  printPaperSize: 'printPaperSize',
  printColor: 'printColor',
  licenseKey: 'licenseKey',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  recoveryHash: 'recoveryHash',
  role: 'role',
  isActive: 'isActive',
  lastLogin: 'lastLogin',
  avatar: 'avatar',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  uhid: 'uhid',
  name: 'name',
  age: 'age',
  ageUnit: 'ageUnit',
  gender: 'gender',
  mobile: 'mobile',
  email: 'email',
  address: 'address',
  bloodGroup: 'bloodGroup',
  emergencyContact: 'emergencyContact',
  referredDoctor: 'referredDoctor',
  createdBy: 'createdBy',
  registeredAt: 'registeredAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DoctorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  qualification: 'qualification',
  specialization: 'specialization',
  hospital: 'hospital',
  mobile: 'mobile',
  email: 'email',
  consultationFee: 'consultationFee',
  commission: 'commission',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CatalogItemScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  category: 'category',
  defaultPrice: 'defaultPrice',
  costPrice: 'costPrice',
  stock: 'stock',
  unit: 'unit',
  taxPercent: 'taxPercent',
  isCustom: 'isCustom',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.BillScalarFieldEnum = {
  id: 'id',
  billNo: 'billNo',
  patientId: 'patientId',
  patientName: 'patientName',
  patientAge: 'patientAge',
  patientGender: 'patientGender',
  patientMobile: 'patientMobile',
  doctorName: 'doctorName',
  subtotal: 'subtotal',
  discountType: 'discountType',
  discountValue: 'discountValue',
  discountAmount: 'discountAmount',
  gstPercent: 'gstPercent',
  gstAmount: 'gstAmount',
  totalAmount: 'totalAmount',
  paidAmount: 'paidAmount',
  dueAmount: 'dueAmount',
  paymentMethod: 'paymentMethod',
  paymentStatus: 'paymentStatus',
  notes: 'notes',
  clinicSnapshot: 'clinicSnapshot',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BillItemScalarFieldEnum = {
  id: 'id',
  billId: 'billId',
  itemId: 'itemId',
  itemName: 'itemName',
  itemCategory: 'itemCategory',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  discount: 'discount',
  total: 'total',
  createdAt: 'createdAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  billId: 'billId',
  amount: 'amount',
  method: 'method',
  reference: 'reference',
  receivedBy: 'receivedBy',
  paidAt: 'paidAt'
};

exports.Prisma.LicenseScalarFieldEnum = {
  id: 'id',
  machineId: 'machineId',
  licenseKey: 'licenseKey',
  status: 'status',
  tier: 'tier',
  trialStartedAt: 'trialStartedAt',
  activatedAt: 'activatedAt',
  expiresAt: 'expiresAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  details: 'details',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  ClinicSettings: 'ClinicSettings',
  User: 'User',
  Patient: 'Patient',
  Doctor: 'Doctor',
  CatalogItem: 'CatalogItem',
  Bill: 'Bill',
  BillItem: 'BillItem',
  Payment: 'Payment',
  License: 'License',
  ActivityLog: 'ActivityLog'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
