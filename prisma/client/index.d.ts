
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ClinicSettings
 * 
 */
export type ClinicSettings = $Result.DefaultSelection<Prisma.$ClinicSettingsPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model CatalogItem
 * 
 */
export type CatalogItem = $Result.DefaultSelection<Prisma.$CatalogItemPayload>
/**
 * Model Bill
 * 
 */
export type Bill = $Result.DefaultSelection<Prisma.$BillPayload>
/**
 * Model BillItem
 * 
 */
export type BillItem = $Result.DefaultSelection<Prisma.$BillItemPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model License
 * 
 */
export type License = $Result.DefaultSelection<Prisma.$LicensePayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ClinicSettings
 * const clinicSettings = await prisma.clinicSettings.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ClinicSettings
   * const clinicSettings = await prisma.clinicSettings.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.clinicSettings`: Exposes CRUD operations for the **ClinicSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicSettings
    * const clinicSettings = await prisma.clinicSettings.findMany()
    * ```
    */
  get clinicSettings(): Prisma.ClinicSettingsDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs>;

  /**
   * `prisma.catalogItem`: Exposes CRUD operations for the **CatalogItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CatalogItems
    * const catalogItems = await prisma.catalogItem.findMany()
    * ```
    */
  get catalogItem(): Prisma.CatalogItemDelegate<ExtArgs>;

  /**
   * `prisma.bill`: Exposes CRUD operations for the **Bill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bills
    * const bills = await prisma.bill.findMany()
    * ```
    */
  get bill(): Prisma.BillDelegate<ExtArgs>;

  /**
   * `prisma.billItem`: Exposes CRUD operations for the **BillItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BillItems
    * const billItems = await prisma.billItem.findMany()
    * ```
    */
  get billItem(): Prisma.BillItemDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.license`: Exposes CRUD operations for the **License** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Licenses
    * const licenses = await prisma.license.findMany()
    * ```
    */
  get license(): Prisma.LicenseDelegate<ExtArgs>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "clinicSettings" | "user" | "patient" | "doctor" | "catalogItem" | "bill" | "billItem" | "payment" | "license" | "activityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ClinicSettings: {
        payload: Prisma.$ClinicSettingsPayload<ExtArgs>
        fields: Prisma.ClinicSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>
          }
          findFirst: {
            args: Prisma.ClinicSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>
          }
          findMany: {
            args: Prisma.ClinicSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>[]
          }
          create: {
            args: Prisma.ClinicSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>
          }
          createMany: {
            args: Prisma.ClinicSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>[]
          }
          delete: {
            args: Prisma.ClinicSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>
          }
          update: {
            args: Prisma.ClinicSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>
          }
          deleteMany: {
            args: Prisma.ClinicSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClinicSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSettingsPayload>
          }
          aggregate: {
            args: Prisma.ClinicSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicSettings>
          }
          groupBy: {
            args: Prisma.ClinicSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicSettingsCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      CatalogItem: {
        payload: Prisma.$CatalogItemPayload<ExtArgs>
        fields: Prisma.CatalogItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatalogItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatalogItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>
          }
          findFirst: {
            args: Prisma.CatalogItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatalogItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>
          }
          findMany: {
            args: Prisma.CatalogItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>[]
          }
          create: {
            args: Prisma.CatalogItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>
          }
          createMany: {
            args: Prisma.CatalogItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CatalogItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>[]
          }
          delete: {
            args: Prisma.CatalogItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>
          }
          update: {
            args: Prisma.CatalogItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>
          }
          deleteMany: {
            args: Prisma.CatalogItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatalogItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CatalogItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogItemPayload>
          }
          aggregate: {
            args: Prisma.CatalogItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatalogItem>
          }
          groupBy: {
            args: Prisma.CatalogItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatalogItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CatalogItemCountArgs<ExtArgs>
            result: $Utils.Optional<CatalogItemCountAggregateOutputType> | number
          }
        }
      }
      Bill: {
        payload: Prisma.$BillPayload<ExtArgs>
        fields: Prisma.BillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findFirst: {
            args: Prisma.BillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findMany: {
            args: Prisma.BillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          create: {
            args: Prisma.BillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          createMany: {
            args: Prisma.BillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          delete: {
            args: Prisma.BillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          update: {
            args: Prisma.BillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          deleteMany: {
            args: Prisma.BillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          aggregate: {
            args: Prisma.BillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBill>
          }
          groupBy: {
            args: Prisma.BillGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillCountArgs<ExtArgs>
            result: $Utils.Optional<BillCountAggregateOutputType> | number
          }
        }
      }
      BillItem: {
        payload: Prisma.$BillItemPayload<ExtArgs>
        fields: Prisma.BillItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>
          }
          findFirst: {
            args: Prisma.BillItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>
          }
          findMany: {
            args: Prisma.BillItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>[]
          }
          create: {
            args: Prisma.BillItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>
          }
          createMany: {
            args: Prisma.BillItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>[]
          }
          delete: {
            args: Prisma.BillItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>
          }
          update: {
            args: Prisma.BillItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>
          }
          deleteMany: {
            args: Prisma.BillItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillItemPayload>
          }
          aggregate: {
            args: Prisma.BillItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBillItem>
          }
          groupBy: {
            args: Prisma.BillItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillItemCountArgs<ExtArgs>
            result: $Utils.Optional<BillItemCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      License: {
        payload: Prisma.$LicensePayload<ExtArgs>
        fields: Prisma.LicenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LicenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LicenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>
          }
          findFirst: {
            args: Prisma.LicenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LicenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>
          }
          findMany: {
            args: Prisma.LicenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>[]
          }
          create: {
            args: Prisma.LicenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>
          }
          createMany: {
            args: Prisma.LicenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LicenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>[]
          }
          delete: {
            args: Prisma.LicenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>
          }
          update: {
            args: Prisma.LicenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>
          }
          deleteMany: {
            args: Prisma.LicenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LicenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LicenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicensePayload>
          }
          aggregate: {
            args: Prisma.LicenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLicense>
          }
          groupBy: {
            args: Prisma.LicenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<LicenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.LicenseCountArgs<ExtArgs>
            result: $Utils.Optional<LicenseCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    patients: number
    bills: number
    activityLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patients?: boolean | UserCountOutputTypeCountPatientsArgs
    bills?: boolean | UserCountOutputTypeCountBillsArgs
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    bills: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bills?: boolean | PatientCountOutputTypeCountBillsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }


  /**
   * Count Type BillCountOutputType
   */

  export type BillCountOutputType = {
    items: number
    payments: number
  }

  export type BillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | BillCountOutputTypeCountItemsArgs
    payments?: boolean | BillCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * BillCountOutputType without action
   */
  export type BillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillCountOutputType
     */
    select?: BillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BillCountOutputType without action
   */
  export type BillCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillItemWhereInput
  }

  /**
   * BillCountOutputType without action
   */
  export type BillCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ClinicSettings
   */

  export type AggregateClinicSettings = {
    _count: ClinicSettingsCountAggregateOutputType | null
    _avg: ClinicSettingsAvgAggregateOutputType | null
    _sum: ClinicSettingsSumAggregateOutputType | null
    _min: ClinicSettingsMinAggregateOutputType | null
    _max: ClinicSettingsMaxAggregateOutputType | null
  }

  export type ClinicSettingsAvgAggregateOutputType = {
    id: number | null
  }

  export type ClinicSettingsSumAggregateOutputType = {
    id: number | null
  }

  export type ClinicSettingsMinAggregateOutputType = {
    id: number | null
    clinicName: string | null
    tagline: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    doctorName: string | null
    doctorQualification: string | null
    doctorRegNo: string | null
    dlNumber: string | null
    gstin: string | null
    currencySymbol: string | null
    footerNote: string | null
    termsConditions: string | null
    logo: Buffer | null
    doctorSignature: Buffer | null
    clinicStamp: Buffer | null
    letterhead: boolean | null
    printShowLogo: boolean | null
    printShowSignature: boolean | null
    printThermal: boolean | null
    printPaperSize: string | null
    printColor: string | null
    licenseKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicSettingsMaxAggregateOutputType = {
    id: number | null
    clinicName: string | null
    tagline: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    doctorName: string | null
    doctorQualification: string | null
    doctorRegNo: string | null
    dlNumber: string | null
    gstin: string | null
    currencySymbol: string | null
    footerNote: string | null
    termsConditions: string | null
    logo: Buffer | null
    doctorSignature: Buffer | null
    clinicStamp: Buffer | null
    letterhead: boolean | null
    printShowLogo: boolean | null
    printShowSignature: boolean | null
    printThermal: boolean | null
    printPaperSize: string | null
    printColor: string | null
    licenseKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicSettingsCountAggregateOutputType = {
    id: number
    clinicName: number
    tagline: number
    address: number
    phone: number
    email: number
    website: number
    doctorName: number
    doctorQualification: number
    doctorRegNo: number
    dlNumber: number
    gstin: number
    currencySymbol: number
    footerNote: number
    termsConditions: number
    logo: number
    doctorSignature: number
    clinicStamp: number
    letterhead: number
    printShowLogo: number
    printShowSignature: number
    printThermal: number
    printPaperSize: number
    printColor: number
    licenseKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicSettingsAvgAggregateInputType = {
    id?: true
  }

  export type ClinicSettingsSumAggregateInputType = {
    id?: true
  }

  export type ClinicSettingsMinAggregateInputType = {
    id?: true
    clinicName?: true
    tagline?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    doctorName?: true
    doctorQualification?: true
    doctorRegNo?: true
    dlNumber?: true
    gstin?: true
    currencySymbol?: true
    footerNote?: true
    termsConditions?: true
    logo?: true
    doctorSignature?: true
    clinicStamp?: true
    letterhead?: true
    printShowLogo?: true
    printShowSignature?: true
    printThermal?: true
    printPaperSize?: true
    printColor?: true
    licenseKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicSettingsMaxAggregateInputType = {
    id?: true
    clinicName?: true
    tagline?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    doctorName?: true
    doctorQualification?: true
    doctorRegNo?: true
    dlNumber?: true
    gstin?: true
    currencySymbol?: true
    footerNote?: true
    termsConditions?: true
    logo?: true
    doctorSignature?: true
    clinicStamp?: true
    letterhead?: true
    printShowLogo?: true
    printShowSignature?: true
    printThermal?: true
    printPaperSize?: true
    printColor?: true
    licenseKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicSettingsCountAggregateInputType = {
    id?: true
    clinicName?: true
    tagline?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    doctorName?: true
    doctorQualification?: true
    doctorRegNo?: true
    dlNumber?: true
    gstin?: true
    currencySymbol?: true
    footerNote?: true
    termsConditions?: true
    logo?: true
    doctorSignature?: true
    clinicStamp?: true
    letterhead?: true
    printShowLogo?: true
    printShowSignature?: true
    printThermal?: true
    printPaperSize?: true
    printColor?: true
    licenseKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicSettings to aggregate.
     */
    where?: ClinicSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSettings to fetch.
     */
    orderBy?: ClinicSettingsOrderByWithRelationInput | ClinicSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicSettings
    **/
    _count?: true | ClinicSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicSettingsMaxAggregateInputType
  }

  export type GetClinicSettingsAggregateType<T extends ClinicSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicSettings[P]>
      : GetScalarType<T[P], AggregateClinicSettings[P]>
  }




  export type ClinicSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSettingsWhereInput
    orderBy?: ClinicSettingsOrderByWithAggregationInput | ClinicSettingsOrderByWithAggregationInput[]
    by: ClinicSettingsScalarFieldEnum[] | ClinicSettingsScalarFieldEnum
    having?: ClinicSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicSettingsCountAggregateInputType | true
    _avg?: ClinicSettingsAvgAggregateInputType
    _sum?: ClinicSettingsSumAggregateInputType
    _min?: ClinicSettingsMinAggregateInputType
    _max?: ClinicSettingsMaxAggregateInputType
  }

  export type ClinicSettingsGroupByOutputType = {
    id: number
    clinicName: string
    tagline: string | null
    address: string
    phone: string
    email: string | null
    website: string | null
    doctorName: string | null
    doctorQualification: string | null
    doctorRegNo: string | null
    dlNumber: string | null
    gstin: string | null
    currencySymbol: string
    footerNote: string | null
    termsConditions: string | null
    logo: Buffer | null
    doctorSignature: Buffer | null
    clinicStamp: Buffer | null
    letterhead: boolean
    printShowLogo: boolean
    printShowSignature: boolean
    printThermal: boolean
    printPaperSize: string
    printColor: string
    licenseKey: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClinicSettingsCountAggregateOutputType | null
    _avg: ClinicSettingsAvgAggregateOutputType | null
    _sum: ClinicSettingsSumAggregateOutputType | null
    _min: ClinicSettingsMinAggregateOutputType | null
    _max: ClinicSettingsMaxAggregateOutputType | null
  }

  type GetClinicSettingsGroupByPayload<T extends ClinicSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicSettingsGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicName?: boolean
    tagline?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    doctorName?: boolean
    doctorQualification?: boolean
    doctorRegNo?: boolean
    dlNumber?: boolean
    gstin?: boolean
    currencySymbol?: boolean
    footerNote?: boolean
    termsConditions?: boolean
    logo?: boolean
    doctorSignature?: boolean
    clinicStamp?: boolean
    letterhead?: boolean
    printShowLogo?: boolean
    printShowSignature?: boolean
    printThermal?: boolean
    printPaperSize?: boolean
    printColor?: boolean
    licenseKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinicSettings"]>

  export type ClinicSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicName?: boolean
    tagline?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    doctorName?: boolean
    doctorQualification?: boolean
    doctorRegNo?: boolean
    dlNumber?: boolean
    gstin?: boolean
    currencySymbol?: boolean
    footerNote?: boolean
    termsConditions?: boolean
    logo?: boolean
    doctorSignature?: boolean
    clinicStamp?: boolean
    letterhead?: boolean
    printShowLogo?: boolean
    printShowSignature?: boolean
    printThermal?: boolean
    printPaperSize?: boolean
    printColor?: boolean
    licenseKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinicSettings"]>

  export type ClinicSettingsSelectScalar = {
    id?: boolean
    clinicName?: boolean
    tagline?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    doctorName?: boolean
    doctorQualification?: boolean
    doctorRegNo?: boolean
    dlNumber?: boolean
    gstin?: boolean
    currencySymbol?: boolean
    footerNote?: boolean
    termsConditions?: boolean
    logo?: boolean
    doctorSignature?: boolean
    clinicStamp?: boolean
    letterhead?: boolean
    printShowLogo?: boolean
    printShowSignature?: boolean
    printThermal?: boolean
    printPaperSize?: boolean
    printColor?: boolean
    licenseKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ClinicSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clinicName: string
      tagline: string | null
      address: string
      phone: string
      email: string | null
      website: string | null
      doctorName: string | null
      doctorQualification: string | null
      doctorRegNo: string | null
      dlNumber: string | null
      gstin: string | null
      currencySymbol: string
      footerNote: string | null
      termsConditions: string | null
      logo: Buffer | null
      doctorSignature: Buffer | null
      clinicStamp: Buffer | null
      letterhead: boolean
      printShowLogo: boolean
      printShowSignature: boolean
      printThermal: boolean
      printPaperSize: string
      printColor: string
      licenseKey: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinicSettings"]>
    composites: {}
  }

  type ClinicSettingsGetPayload<S extends boolean | null | undefined | ClinicSettingsDefaultArgs> = $Result.GetResult<Prisma.$ClinicSettingsPayload, S>

  type ClinicSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClinicSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClinicSettingsCountAggregateInputType | true
    }

  export interface ClinicSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicSettings'], meta: { name: 'ClinicSettings' } }
    /**
     * Find zero or one ClinicSettings that matches the filter.
     * @param {ClinicSettingsFindUniqueArgs} args - Arguments to find a ClinicSettings
     * @example
     * // Get one ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicSettingsFindUniqueArgs>(args: SelectSubset<T, ClinicSettingsFindUniqueArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ClinicSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClinicSettingsFindUniqueOrThrowArgs} args - Arguments to find a ClinicSettings
     * @example
     * // Get one ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ClinicSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsFindFirstArgs} args - Arguments to find a ClinicSettings
     * @example
     * // Get one ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicSettingsFindFirstArgs>(args?: SelectSubset<T, ClinicSettingsFindFirstArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ClinicSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsFindFirstOrThrowArgs} args - Arguments to find a ClinicSettings
     * @example
     * // Get one ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ClinicSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.findMany()
     * 
     * // Get first 10 ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicSettingsWithIdOnly = await prisma.clinicSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicSettingsFindManyArgs>(args?: SelectSubset<T, ClinicSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ClinicSettings.
     * @param {ClinicSettingsCreateArgs} args - Arguments to create a ClinicSettings.
     * @example
     * // Create one ClinicSettings
     * const ClinicSettings = await prisma.clinicSettings.create({
     *   data: {
     *     // ... data to create a ClinicSettings
     *   }
     * })
     * 
     */
    create<T extends ClinicSettingsCreateArgs>(args: SelectSubset<T, ClinicSettingsCreateArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ClinicSettings.
     * @param {ClinicSettingsCreateManyArgs} args - Arguments to create many ClinicSettings.
     * @example
     * // Create many ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicSettingsCreateManyArgs>(args?: SelectSubset<T, ClinicSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicSettings and returns the data saved in the database.
     * @param {ClinicSettingsCreateManyAndReturnArgs} args - Arguments to create many ClinicSettings.
     * @example
     * // Create many ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicSettings and only return the `id`
     * const clinicSettingsWithIdOnly = await prisma.clinicSettings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ClinicSettings.
     * @param {ClinicSettingsDeleteArgs} args - Arguments to delete one ClinicSettings.
     * @example
     * // Delete one ClinicSettings
     * const ClinicSettings = await prisma.clinicSettings.delete({
     *   where: {
     *     // ... filter to delete one ClinicSettings
     *   }
     * })
     * 
     */
    delete<T extends ClinicSettingsDeleteArgs>(args: SelectSubset<T, ClinicSettingsDeleteArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ClinicSettings.
     * @param {ClinicSettingsUpdateArgs} args - Arguments to update one ClinicSettings.
     * @example
     * // Update one ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicSettingsUpdateArgs>(args: SelectSubset<T, ClinicSettingsUpdateArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ClinicSettings.
     * @param {ClinicSettingsDeleteManyArgs} args - Arguments to filter ClinicSettings to delete.
     * @example
     * // Delete a few ClinicSettings
     * const { count } = await prisma.clinicSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicSettingsDeleteManyArgs>(args?: SelectSubset<T, ClinicSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicSettingsUpdateManyArgs>(args: SelectSubset<T, ClinicSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ClinicSettings.
     * @param {ClinicSettingsUpsertArgs} args - Arguments to update or create a ClinicSettings.
     * @example
     * // Update or create a ClinicSettings
     * const clinicSettings = await prisma.clinicSettings.upsert({
     *   create: {
     *     // ... data to create a ClinicSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicSettings we want to update
     *   }
     * })
     */
    upsert<T extends ClinicSettingsUpsertArgs>(args: SelectSubset<T, ClinicSettingsUpsertArgs<ExtArgs>>): Prisma__ClinicSettingsClient<$Result.GetResult<Prisma.$ClinicSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ClinicSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsCountArgs} args - Arguments to filter ClinicSettings to count.
     * @example
     * // Count the number of ClinicSettings
     * const count = await prisma.clinicSettings.count({
     *   where: {
     *     // ... the filter for the ClinicSettings we want to count
     *   }
     * })
    **/
    count<T extends ClinicSettingsCountArgs>(
      args?: Subset<T, ClinicSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicSettingsAggregateArgs>(args: Subset<T, ClinicSettingsAggregateArgs>): Prisma.PrismaPromise<GetClinicSettingsAggregateType<T>>

    /**
     * Group by ClinicSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicSettingsGroupByArgs['orderBy'] }
        : { orderBy?: ClinicSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicSettings model
   */
  readonly fields: ClinicSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClinicSettings model
   */ 
  interface ClinicSettingsFieldRefs {
    readonly id: FieldRef<"ClinicSettings", 'Int'>
    readonly clinicName: FieldRef<"ClinicSettings", 'String'>
    readonly tagline: FieldRef<"ClinicSettings", 'String'>
    readonly address: FieldRef<"ClinicSettings", 'String'>
    readonly phone: FieldRef<"ClinicSettings", 'String'>
    readonly email: FieldRef<"ClinicSettings", 'String'>
    readonly website: FieldRef<"ClinicSettings", 'String'>
    readonly doctorName: FieldRef<"ClinicSettings", 'String'>
    readonly doctorQualification: FieldRef<"ClinicSettings", 'String'>
    readonly doctorRegNo: FieldRef<"ClinicSettings", 'String'>
    readonly dlNumber: FieldRef<"ClinicSettings", 'String'>
    readonly gstin: FieldRef<"ClinicSettings", 'String'>
    readonly currencySymbol: FieldRef<"ClinicSettings", 'String'>
    readonly footerNote: FieldRef<"ClinicSettings", 'String'>
    readonly termsConditions: FieldRef<"ClinicSettings", 'String'>
    readonly logo: FieldRef<"ClinicSettings", 'Bytes'>
    readonly doctorSignature: FieldRef<"ClinicSettings", 'Bytes'>
    readonly clinicStamp: FieldRef<"ClinicSettings", 'Bytes'>
    readonly letterhead: FieldRef<"ClinicSettings", 'Boolean'>
    readonly printShowLogo: FieldRef<"ClinicSettings", 'Boolean'>
    readonly printShowSignature: FieldRef<"ClinicSettings", 'Boolean'>
    readonly printThermal: FieldRef<"ClinicSettings", 'Boolean'>
    readonly printPaperSize: FieldRef<"ClinicSettings", 'String'>
    readonly printColor: FieldRef<"ClinicSettings", 'String'>
    readonly licenseKey: FieldRef<"ClinicSettings", 'String'>
    readonly createdAt: FieldRef<"ClinicSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"ClinicSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicSettings findUnique
   */
  export type ClinicSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * Filter, which ClinicSettings to fetch.
     */
    where: ClinicSettingsWhereUniqueInput
  }

  /**
   * ClinicSettings findUniqueOrThrow
   */
  export type ClinicSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * Filter, which ClinicSettings to fetch.
     */
    where: ClinicSettingsWhereUniqueInput
  }

  /**
   * ClinicSettings findFirst
   */
  export type ClinicSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * Filter, which ClinicSettings to fetch.
     */
    where?: ClinicSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSettings to fetch.
     */
    orderBy?: ClinicSettingsOrderByWithRelationInput | ClinicSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicSettings.
     */
    cursor?: ClinicSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSettings.
     */
    distinct?: ClinicSettingsScalarFieldEnum | ClinicSettingsScalarFieldEnum[]
  }

  /**
   * ClinicSettings findFirstOrThrow
   */
  export type ClinicSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * Filter, which ClinicSettings to fetch.
     */
    where?: ClinicSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSettings to fetch.
     */
    orderBy?: ClinicSettingsOrderByWithRelationInput | ClinicSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicSettings.
     */
    cursor?: ClinicSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSettings.
     */
    distinct?: ClinicSettingsScalarFieldEnum | ClinicSettingsScalarFieldEnum[]
  }

  /**
   * ClinicSettings findMany
   */
  export type ClinicSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * Filter, which ClinicSettings to fetch.
     */
    where?: ClinicSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSettings to fetch.
     */
    orderBy?: ClinicSettingsOrderByWithRelationInput | ClinicSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicSettings.
     */
    cursor?: ClinicSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSettings.
     */
    skip?: number
    distinct?: ClinicSettingsScalarFieldEnum | ClinicSettingsScalarFieldEnum[]
  }

  /**
   * ClinicSettings create
   */
  export type ClinicSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a ClinicSettings.
     */
    data: XOR<ClinicSettingsCreateInput, ClinicSettingsUncheckedCreateInput>
  }

  /**
   * ClinicSettings createMany
   */
  export type ClinicSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicSettings.
     */
    data: ClinicSettingsCreateManyInput | ClinicSettingsCreateManyInput[]
  }

  /**
   * ClinicSettings createManyAndReturn
   */
  export type ClinicSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ClinicSettings.
     */
    data: ClinicSettingsCreateManyInput | ClinicSettingsCreateManyInput[]
  }

  /**
   * ClinicSettings update
   */
  export type ClinicSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a ClinicSettings.
     */
    data: XOR<ClinicSettingsUpdateInput, ClinicSettingsUncheckedUpdateInput>
    /**
     * Choose, which ClinicSettings to update.
     */
    where: ClinicSettingsWhereUniqueInput
  }

  /**
   * ClinicSettings updateMany
   */
  export type ClinicSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicSettings.
     */
    data: XOR<ClinicSettingsUpdateManyMutationInput, ClinicSettingsUncheckedUpdateManyInput>
    /**
     * Filter which ClinicSettings to update
     */
    where?: ClinicSettingsWhereInput
  }

  /**
   * ClinicSettings upsert
   */
  export type ClinicSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the ClinicSettings to update in case it exists.
     */
    where: ClinicSettingsWhereUniqueInput
    /**
     * In case the ClinicSettings found by the `where` argument doesn't exist, create a new ClinicSettings with this data.
     */
    create: XOR<ClinicSettingsCreateInput, ClinicSettingsUncheckedCreateInput>
    /**
     * In case the ClinicSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicSettingsUpdateInput, ClinicSettingsUncheckedUpdateInput>
  }

  /**
   * ClinicSettings delete
   */
  export type ClinicSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
    /**
     * Filter which ClinicSettings to delete.
     */
    where: ClinicSettingsWhereUniqueInput
  }

  /**
   * ClinicSettings deleteMany
   */
  export type ClinicSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicSettings to delete
     */
    where?: ClinicSettingsWhereInput
  }

  /**
   * ClinicSettings without action
   */
  export type ClinicSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSettings
     */
    select?: ClinicSettingsSelect<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    recoveryHash: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    avatar: Buffer | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    recoveryHash: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    avatar: Buffer | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    recoveryHash: number
    role: number
    isActive: number
    lastLogin: number
    avatar: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    recoveryHash?: true
    role?: true
    isActive?: true
    lastLogin?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    recoveryHash?: true
    role?: true
    isActive?: true
    lastLogin?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    recoveryHash?: true
    role?: true
    isActive?: true
    lastLogin?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    recoveryHash: string | null
    role: string
    isActive: boolean
    lastLogin: Date | null
    avatar: Buffer | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    recoveryHash?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    patients?: boolean | User$patientsArgs<ExtArgs>
    bills?: boolean | User$billsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    recoveryHash?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    recoveryHash?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patients?: boolean | User$patientsArgs<ExtArgs>
    bills?: boolean | User$billsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      patients: Prisma.$PatientPayload<ExtArgs>[]
      bills: Prisma.$BillPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      recoveryHash: string | null
      role: string
      isActive: boolean
      lastLogin: Date | null
      avatar: Buffer | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patients<T extends User$patientsArgs<ExtArgs> = {}>(args?: Subset<T, User$patientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany"> | Null>
    bills<T extends User$billsArgs<ExtArgs> = {}>(args?: Subset<T, User$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany"> | Null>
    activityLogs<T extends User$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly recoveryHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly avatar: FieldRef<"User", 'Bytes'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.patients
   */
  export type User$patientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    cursor?: PatientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * User.bills
   */
  export type User$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * User.activityLogs
   */
  export type User$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    age: number | null
    createdBy: number | null
  }

  export type PatientSumAggregateOutputType = {
    age: number | null
    createdBy: number | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    uhid: string | null
    name: string | null
    age: number | null
    ageUnit: string | null
    gender: string | null
    mobile: string | null
    email: string | null
    address: string | null
    bloodGroup: string | null
    emergencyContact: string | null
    referredDoctor: string | null
    createdBy: number | null
    registeredAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    uhid: string | null
    name: string | null
    age: number | null
    ageUnit: string | null
    gender: string | null
    mobile: string | null
    email: string | null
    address: string | null
    bloodGroup: string | null
    emergencyContact: string | null
    referredDoctor: string | null
    createdBy: number | null
    registeredAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    uhid: number
    name: number
    age: number
    ageUnit: number
    gender: number
    mobile: number
    email: number
    address: number
    bloodGroup: number
    emergencyContact: number
    referredDoctor: number
    createdBy: number
    registeredAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    age?: true
    createdBy?: true
  }

  export type PatientSumAggregateInputType = {
    age?: true
    createdBy?: true
  }

  export type PatientMinAggregateInputType = {
    id?: true
    uhid?: true
    name?: true
    age?: true
    ageUnit?: true
    gender?: true
    mobile?: true
    email?: true
    address?: true
    bloodGroup?: true
    emergencyContact?: true
    referredDoctor?: true
    createdBy?: true
    registeredAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    uhid?: true
    name?: true
    age?: true
    ageUnit?: true
    gender?: true
    mobile?: true
    email?: true
    address?: true
    bloodGroup?: true
    emergencyContact?: true
    referredDoctor?: true
    createdBy?: true
    registeredAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    uhid?: true
    name?: true
    age?: true
    ageUnit?: true
    gender?: true
    mobile?: true
    email?: true
    address?: true
    bloodGroup?: true
    emergencyContact?: true
    referredDoctor?: true
    createdBy?: true
    registeredAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    uhid: string | null
    name: string
    age: number
    ageUnit: string
    gender: string
    mobile: string
    email: string | null
    address: string | null
    bloodGroup: string | null
    emergencyContact: string | null
    referredDoctor: string | null
    createdBy: number | null
    registeredAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uhid?: boolean
    name?: boolean
    age?: boolean
    ageUnit?: boolean
    gender?: boolean
    mobile?: boolean
    email?: boolean
    address?: boolean
    bloodGroup?: boolean
    emergencyContact?: boolean
    referredDoctor?: boolean
    createdBy?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
    bills?: boolean | Patient$billsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uhid?: boolean
    name?: boolean
    age?: boolean
    ageUnit?: boolean
    gender?: boolean
    mobile?: boolean
    email?: boolean
    address?: boolean
    bloodGroup?: boolean
    emergencyContact?: boolean
    referredDoctor?: boolean
    createdBy?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    uhid?: boolean
    name?: boolean
    age?: boolean
    ageUnit?: boolean
    gender?: boolean
    mobile?: boolean
    email?: boolean
    address?: boolean
    bloodGroup?: boolean
    emergencyContact?: boolean
    referredDoctor?: boolean
    createdBy?: boolean
    registeredAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
    bills?: boolean | Patient$billsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      bills: Prisma.$BillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      uhid: string | null
      name: string
      age: number
      ageUnit: string
      gender: string
      mobile: string
      email: string | null
      address: string | null
      bloodGroup: string | null
      emergencyContact: string | null
      referredDoctor: string | null
      createdBy: number | null
      registeredAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Patient$userArgs<ExtArgs> = {}>(args?: Subset<T, Patient$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    bills<T extends Patient$billsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */ 
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly uhid: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly age: FieldRef<"Patient", 'Int'>
    readonly ageUnit: FieldRef<"Patient", 'String'>
    readonly gender: FieldRef<"Patient", 'String'>
    readonly mobile: FieldRef<"Patient", 'String'>
    readonly email: FieldRef<"Patient", 'String'>
    readonly address: FieldRef<"Patient", 'String'>
    readonly bloodGroup: FieldRef<"Patient", 'String'>
    readonly emergencyContact: FieldRef<"Patient", 'String'>
    readonly referredDoctor: FieldRef<"Patient", 'String'>
    readonly createdBy: FieldRef<"Patient", 'Int'>
    readonly registeredAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
    readonly deletedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
  }

  /**
   * Patient.user
   */
  export type Patient$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Patient.bills
   */
  export type Patient$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorAvgAggregateOutputType = {
    id: number | null
    consultationFee: number | null
    commission: number | null
  }

  export type DoctorSumAggregateOutputType = {
    id: number | null
    consultationFee: number | null
    commission: number | null
  }

  export type DoctorMinAggregateOutputType = {
    id: number | null
    name: string | null
    qualification: string | null
    specialization: string | null
    hospital: string | null
    mobile: string | null
    email: string | null
    consultationFee: number | null
    commission: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    qualification: string | null
    specialization: string | null
    hospital: string | null
    mobile: string | null
    email: string | null
    consultationFee: number | null
    commission: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorCountAggregateOutputType = {
    id: number
    name: number
    qualification: number
    specialization: number
    hospital: number
    mobile: number
    email: number
    consultationFee: number
    commission: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoctorAvgAggregateInputType = {
    id?: true
    consultationFee?: true
    commission?: true
  }

  export type DoctorSumAggregateInputType = {
    id?: true
    consultationFee?: true
    commission?: true
  }

  export type DoctorMinAggregateInputType = {
    id?: true
    name?: true
    qualification?: true
    specialization?: true
    hospital?: true
    mobile?: true
    email?: true
    consultationFee?: true
    commission?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorMaxAggregateInputType = {
    id?: true
    name?: true
    qualification?: true
    specialization?: true
    hospital?: true
    mobile?: true
    email?: true
    consultationFee?: true
    commission?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorCountAggregateInputType = {
    id?: true
    name?: true
    qualification?: true
    specialization?: true
    hospital?: true
    mobile?: true
    email?: true
    consultationFee?: true
    commission?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _avg?: DoctorAvgAggregateInputType
    _sum?: DoctorSumAggregateInputType
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    id: number
    name: string
    qualification: string | null
    specialization: string | null
    hospital: string | null
    mobile: string | null
    email: string | null
    consultationFee: number
    commission: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    qualification?: boolean
    specialization?: boolean
    hospital?: boolean
    mobile?: boolean
    email?: boolean
    consultationFee?: boolean
    commission?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    qualification?: boolean
    specialization?: boolean
    hospital?: boolean
    mobile?: boolean
    email?: boolean
    consultationFee?: boolean
    commission?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    id?: boolean
    name?: boolean
    qualification?: boolean
    specialization?: boolean
    hospital?: boolean
    mobile?: boolean
    email?: boolean
    consultationFee?: boolean
    commission?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      qualification: string | null
      specialization: string | null
      hospital: string | null
      mobile: string | null
      email: string | null
      consultationFee: number
      commission: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doctor model
   */ 
  interface DoctorFieldRefs {
    readonly id: FieldRef<"Doctor", 'Int'>
    readonly name: FieldRef<"Doctor", 'String'>
    readonly qualification: FieldRef<"Doctor", 'String'>
    readonly specialization: FieldRef<"Doctor", 'String'>
    readonly hospital: FieldRef<"Doctor", 'String'>
    readonly mobile: FieldRef<"Doctor", 'String'>
    readonly email: FieldRef<"Doctor", 'String'>
    readonly consultationFee: FieldRef<"Doctor", 'Float'>
    readonly commission: FieldRef<"Doctor", 'Float'>
    readonly isActive: FieldRef<"Doctor", 'Boolean'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
    readonly updatedAt: FieldRef<"Doctor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
  }


  /**
   * Model CatalogItem
   */

  export type AggregateCatalogItem = {
    _count: CatalogItemCountAggregateOutputType | null
    _avg: CatalogItemAvgAggregateOutputType | null
    _sum: CatalogItemSumAggregateOutputType | null
    _min: CatalogItemMinAggregateOutputType | null
    _max: CatalogItemMaxAggregateOutputType | null
  }

  export type CatalogItemAvgAggregateOutputType = {
    id: number | null
    defaultPrice: number | null
    costPrice: number | null
    stock: number | null
    taxPercent: number | null
  }

  export type CatalogItemSumAggregateOutputType = {
    id: number | null
    defaultPrice: number | null
    costPrice: number | null
    stock: number | null
    taxPercent: number | null
  }

  export type CatalogItemMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    category: string | null
    defaultPrice: number | null
    costPrice: number | null
    stock: number | null
    unit: string | null
    taxPercent: number | null
    isCustom: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type CatalogItemMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    category: string | null
    defaultPrice: number | null
    costPrice: number | null
    stock: number | null
    unit: string | null
    taxPercent: number | null
    isCustom: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type CatalogItemCountAggregateOutputType = {
    id: number
    code: number
    name: number
    category: number
    defaultPrice: number
    costPrice: number
    stock: number
    unit: number
    taxPercent: number
    isCustom: number
    isActive: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type CatalogItemAvgAggregateInputType = {
    id?: true
    defaultPrice?: true
    costPrice?: true
    stock?: true
    taxPercent?: true
  }

  export type CatalogItemSumAggregateInputType = {
    id?: true
    defaultPrice?: true
    costPrice?: true
    stock?: true
    taxPercent?: true
  }

  export type CatalogItemMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    defaultPrice?: true
    costPrice?: true
    stock?: true
    unit?: true
    taxPercent?: true
    isCustom?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type CatalogItemMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    defaultPrice?: true
    costPrice?: true
    stock?: true
    unit?: true
    taxPercent?: true
    isCustom?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type CatalogItemCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    defaultPrice?: true
    costPrice?: true
    stock?: true
    unit?: true
    taxPercent?: true
    isCustom?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type CatalogItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogItem to aggregate.
     */
    where?: CatalogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogItems to fetch.
     */
    orderBy?: CatalogItemOrderByWithRelationInput | CatalogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatalogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CatalogItems
    **/
    _count?: true | CatalogItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CatalogItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CatalogItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatalogItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatalogItemMaxAggregateInputType
  }

  export type GetCatalogItemAggregateType<T extends CatalogItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCatalogItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatalogItem[P]>
      : GetScalarType<T[P], AggregateCatalogItem[P]>
  }




  export type CatalogItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogItemWhereInput
    orderBy?: CatalogItemOrderByWithAggregationInput | CatalogItemOrderByWithAggregationInput[]
    by: CatalogItemScalarFieldEnum[] | CatalogItemScalarFieldEnum
    having?: CatalogItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatalogItemCountAggregateInputType | true
    _avg?: CatalogItemAvgAggregateInputType
    _sum?: CatalogItemSumAggregateInputType
    _min?: CatalogItemMinAggregateInputType
    _max?: CatalogItemMaxAggregateInputType
  }

  export type CatalogItemGroupByOutputType = {
    id: number
    code: string | null
    name: string
    category: string
    defaultPrice: number
    costPrice: number | null
    stock: number | null
    unit: string | null
    taxPercent: number | null
    isCustom: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: CatalogItemCountAggregateOutputType | null
    _avg: CatalogItemAvgAggregateOutputType | null
    _sum: CatalogItemSumAggregateOutputType | null
    _min: CatalogItemMinAggregateOutputType | null
    _max: CatalogItemMaxAggregateOutputType | null
  }

  type GetCatalogItemGroupByPayload<T extends CatalogItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatalogItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatalogItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatalogItemGroupByOutputType[P]>
            : GetScalarType<T[P], CatalogItemGroupByOutputType[P]>
        }
      >
    >


  export type CatalogItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    defaultPrice?: boolean
    costPrice?: boolean
    stock?: boolean
    unit?: boolean
    taxPercent?: boolean
    isCustom?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["catalogItem"]>

  export type CatalogItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    defaultPrice?: boolean
    costPrice?: boolean
    stock?: boolean
    unit?: boolean
    taxPercent?: boolean
    isCustom?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["catalogItem"]>

  export type CatalogItemSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    defaultPrice?: boolean
    costPrice?: boolean
    stock?: boolean
    unit?: boolean
    taxPercent?: boolean
    isCustom?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }


  export type $CatalogItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CatalogItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string | null
      name: string
      category: string
      defaultPrice: number
      costPrice: number | null
      stock: number | null
      unit: string | null
      taxPercent: number | null
      isCustom: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["catalogItem"]>
    composites: {}
  }

  type CatalogItemGetPayload<S extends boolean | null | undefined | CatalogItemDefaultArgs> = $Result.GetResult<Prisma.$CatalogItemPayload, S>

  type CatalogItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CatalogItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CatalogItemCountAggregateInputType | true
    }

  export interface CatalogItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CatalogItem'], meta: { name: 'CatalogItem' } }
    /**
     * Find zero or one CatalogItem that matches the filter.
     * @param {CatalogItemFindUniqueArgs} args - Arguments to find a CatalogItem
     * @example
     * // Get one CatalogItem
     * const catalogItem = await prisma.catalogItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatalogItemFindUniqueArgs>(args: SelectSubset<T, CatalogItemFindUniqueArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CatalogItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CatalogItemFindUniqueOrThrowArgs} args - Arguments to find a CatalogItem
     * @example
     * // Get one CatalogItem
     * const catalogItem = await prisma.catalogItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatalogItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CatalogItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CatalogItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemFindFirstArgs} args - Arguments to find a CatalogItem
     * @example
     * // Get one CatalogItem
     * const catalogItem = await prisma.catalogItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatalogItemFindFirstArgs>(args?: SelectSubset<T, CatalogItemFindFirstArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CatalogItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemFindFirstOrThrowArgs} args - Arguments to find a CatalogItem
     * @example
     * // Get one CatalogItem
     * const catalogItem = await prisma.catalogItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatalogItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CatalogItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CatalogItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CatalogItems
     * const catalogItems = await prisma.catalogItem.findMany()
     * 
     * // Get first 10 CatalogItems
     * const catalogItems = await prisma.catalogItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catalogItemWithIdOnly = await prisma.catalogItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatalogItemFindManyArgs>(args?: SelectSubset<T, CatalogItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CatalogItem.
     * @param {CatalogItemCreateArgs} args - Arguments to create a CatalogItem.
     * @example
     * // Create one CatalogItem
     * const CatalogItem = await prisma.catalogItem.create({
     *   data: {
     *     // ... data to create a CatalogItem
     *   }
     * })
     * 
     */
    create<T extends CatalogItemCreateArgs>(args: SelectSubset<T, CatalogItemCreateArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CatalogItems.
     * @param {CatalogItemCreateManyArgs} args - Arguments to create many CatalogItems.
     * @example
     * // Create many CatalogItems
     * const catalogItem = await prisma.catalogItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatalogItemCreateManyArgs>(args?: SelectSubset<T, CatalogItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CatalogItems and returns the data saved in the database.
     * @param {CatalogItemCreateManyAndReturnArgs} args - Arguments to create many CatalogItems.
     * @example
     * // Create many CatalogItems
     * const catalogItem = await prisma.catalogItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CatalogItems and only return the `id`
     * const catalogItemWithIdOnly = await prisma.catalogItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CatalogItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CatalogItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CatalogItem.
     * @param {CatalogItemDeleteArgs} args - Arguments to delete one CatalogItem.
     * @example
     * // Delete one CatalogItem
     * const CatalogItem = await prisma.catalogItem.delete({
     *   where: {
     *     // ... filter to delete one CatalogItem
     *   }
     * })
     * 
     */
    delete<T extends CatalogItemDeleteArgs>(args: SelectSubset<T, CatalogItemDeleteArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CatalogItem.
     * @param {CatalogItemUpdateArgs} args - Arguments to update one CatalogItem.
     * @example
     * // Update one CatalogItem
     * const catalogItem = await prisma.catalogItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatalogItemUpdateArgs>(args: SelectSubset<T, CatalogItemUpdateArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CatalogItems.
     * @param {CatalogItemDeleteManyArgs} args - Arguments to filter CatalogItems to delete.
     * @example
     * // Delete a few CatalogItems
     * const { count } = await prisma.catalogItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatalogItemDeleteManyArgs>(args?: SelectSubset<T, CatalogItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CatalogItems
     * const catalogItem = await prisma.catalogItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatalogItemUpdateManyArgs>(args: SelectSubset<T, CatalogItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CatalogItem.
     * @param {CatalogItemUpsertArgs} args - Arguments to update or create a CatalogItem.
     * @example
     * // Update or create a CatalogItem
     * const catalogItem = await prisma.catalogItem.upsert({
     *   create: {
     *     // ... data to create a CatalogItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CatalogItem we want to update
     *   }
     * })
     */
    upsert<T extends CatalogItemUpsertArgs>(args: SelectSubset<T, CatalogItemUpsertArgs<ExtArgs>>): Prisma__CatalogItemClient<$Result.GetResult<Prisma.$CatalogItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CatalogItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemCountArgs} args - Arguments to filter CatalogItems to count.
     * @example
     * // Count the number of CatalogItems
     * const count = await prisma.catalogItem.count({
     *   where: {
     *     // ... the filter for the CatalogItems we want to count
     *   }
     * })
    **/
    count<T extends CatalogItemCountArgs>(
      args?: Subset<T, CatalogItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatalogItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CatalogItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CatalogItemAggregateArgs>(args: Subset<T, CatalogItemAggregateArgs>): Prisma.PrismaPromise<GetCatalogItemAggregateType<T>>

    /**
     * Group by CatalogItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CatalogItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatalogItemGroupByArgs['orderBy'] }
        : { orderBy?: CatalogItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CatalogItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CatalogItem model
   */
  readonly fields: CatalogItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CatalogItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatalogItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CatalogItem model
   */ 
  interface CatalogItemFieldRefs {
    readonly id: FieldRef<"CatalogItem", 'Int'>
    readonly code: FieldRef<"CatalogItem", 'String'>
    readonly name: FieldRef<"CatalogItem", 'String'>
    readonly category: FieldRef<"CatalogItem", 'String'>
    readonly defaultPrice: FieldRef<"CatalogItem", 'Float'>
    readonly costPrice: FieldRef<"CatalogItem", 'Float'>
    readonly stock: FieldRef<"CatalogItem", 'Int'>
    readonly unit: FieldRef<"CatalogItem", 'String'>
    readonly taxPercent: FieldRef<"CatalogItem", 'Float'>
    readonly isCustom: FieldRef<"CatalogItem", 'Boolean'>
    readonly isActive: FieldRef<"CatalogItem", 'Boolean'>
    readonly createdAt: FieldRef<"CatalogItem", 'DateTime'>
    readonly updatedAt: FieldRef<"CatalogItem", 'DateTime'>
    readonly deletedAt: FieldRef<"CatalogItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CatalogItem findUnique
   */
  export type CatalogItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * Filter, which CatalogItem to fetch.
     */
    where: CatalogItemWhereUniqueInput
  }

  /**
   * CatalogItem findUniqueOrThrow
   */
  export type CatalogItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * Filter, which CatalogItem to fetch.
     */
    where: CatalogItemWhereUniqueInput
  }

  /**
   * CatalogItem findFirst
   */
  export type CatalogItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * Filter, which CatalogItem to fetch.
     */
    where?: CatalogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogItems to fetch.
     */
    orderBy?: CatalogItemOrderByWithRelationInput | CatalogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogItems.
     */
    cursor?: CatalogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogItems.
     */
    distinct?: CatalogItemScalarFieldEnum | CatalogItemScalarFieldEnum[]
  }

  /**
   * CatalogItem findFirstOrThrow
   */
  export type CatalogItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * Filter, which CatalogItem to fetch.
     */
    where?: CatalogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogItems to fetch.
     */
    orderBy?: CatalogItemOrderByWithRelationInput | CatalogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogItems.
     */
    cursor?: CatalogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogItems.
     */
    distinct?: CatalogItemScalarFieldEnum | CatalogItemScalarFieldEnum[]
  }

  /**
   * CatalogItem findMany
   */
  export type CatalogItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * Filter, which CatalogItems to fetch.
     */
    where?: CatalogItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogItems to fetch.
     */
    orderBy?: CatalogItemOrderByWithRelationInput | CatalogItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CatalogItems.
     */
    cursor?: CatalogItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogItems.
     */
    skip?: number
    distinct?: CatalogItemScalarFieldEnum | CatalogItemScalarFieldEnum[]
  }

  /**
   * CatalogItem create
   */
  export type CatalogItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * The data needed to create a CatalogItem.
     */
    data: XOR<CatalogItemCreateInput, CatalogItemUncheckedCreateInput>
  }

  /**
   * CatalogItem createMany
   */
  export type CatalogItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CatalogItems.
     */
    data: CatalogItemCreateManyInput | CatalogItemCreateManyInput[]
  }

  /**
   * CatalogItem createManyAndReturn
   */
  export type CatalogItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CatalogItems.
     */
    data: CatalogItemCreateManyInput | CatalogItemCreateManyInput[]
  }

  /**
   * CatalogItem update
   */
  export type CatalogItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * The data needed to update a CatalogItem.
     */
    data: XOR<CatalogItemUpdateInput, CatalogItemUncheckedUpdateInput>
    /**
     * Choose, which CatalogItem to update.
     */
    where: CatalogItemWhereUniqueInput
  }

  /**
   * CatalogItem updateMany
   */
  export type CatalogItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CatalogItems.
     */
    data: XOR<CatalogItemUpdateManyMutationInput, CatalogItemUncheckedUpdateManyInput>
    /**
     * Filter which CatalogItems to update
     */
    where?: CatalogItemWhereInput
  }

  /**
   * CatalogItem upsert
   */
  export type CatalogItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * The filter to search for the CatalogItem to update in case it exists.
     */
    where: CatalogItemWhereUniqueInput
    /**
     * In case the CatalogItem found by the `where` argument doesn't exist, create a new CatalogItem with this data.
     */
    create: XOR<CatalogItemCreateInput, CatalogItemUncheckedCreateInput>
    /**
     * In case the CatalogItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatalogItemUpdateInput, CatalogItemUncheckedUpdateInput>
  }

  /**
   * CatalogItem delete
   */
  export type CatalogItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
    /**
     * Filter which CatalogItem to delete.
     */
    where: CatalogItemWhereUniqueInput
  }

  /**
   * CatalogItem deleteMany
   */
  export type CatalogItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogItems to delete
     */
    where?: CatalogItemWhereInput
  }

  /**
   * CatalogItem without action
   */
  export type CatalogItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogItem
     */
    select?: CatalogItemSelect<ExtArgs> | null
  }


  /**
   * Model Bill
   */

  export type AggregateBill = {
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  export type BillAvgAggregateOutputType = {
    id: number | null
    patientAge: number | null
    subtotal: number | null
    discountValue: number | null
    discountAmount: number | null
    gstPercent: number | null
    gstAmount: number | null
    totalAmount: number | null
    paidAmount: number | null
    dueAmount: number | null
    createdBy: number | null
  }

  export type BillSumAggregateOutputType = {
    id: number | null
    patientAge: number | null
    subtotal: number | null
    discountValue: number | null
    discountAmount: number | null
    gstPercent: number | null
    gstAmount: number | null
    totalAmount: number | null
    paidAmount: number | null
    dueAmount: number | null
    createdBy: number | null
  }

  export type BillMinAggregateOutputType = {
    id: number | null
    billNo: string | null
    patientId: string | null
    patientName: string | null
    patientAge: number | null
    patientGender: string | null
    patientMobile: string | null
    doctorName: string | null
    subtotal: number | null
    discountType: string | null
    discountValue: number | null
    discountAmount: number | null
    gstPercent: number | null
    gstAmount: number | null
    totalAmount: number | null
    paidAmount: number | null
    dueAmount: number | null
    paymentMethod: string | null
    paymentStatus: string | null
    notes: string | null
    clinicSnapshot: string | null
    createdBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillMaxAggregateOutputType = {
    id: number | null
    billNo: string | null
    patientId: string | null
    patientName: string | null
    patientAge: number | null
    patientGender: string | null
    patientMobile: string | null
    doctorName: string | null
    subtotal: number | null
    discountType: string | null
    discountValue: number | null
    discountAmount: number | null
    gstPercent: number | null
    gstAmount: number | null
    totalAmount: number | null
    paidAmount: number | null
    dueAmount: number | null
    paymentMethod: string | null
    paymentStatus: string | null
    notes: string | null
    clinicSnapshot: string | null
    createdBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillCountAggregateOutputType = {
    id: number
    billNo: number
    patientId: number
    patientName: number
    patientAge: number
    patientGender: number
    patientMobile: number
    doctorName: number
    subtotal: number
    discountType: number
    discountValue: number
    discountAmount: number
    gstPercent: number
    gstAmount: number
    totalAmount: number
    paidAmount: number
    dueAmount: number
    paymentMethod: number
    paymentStatus: number
    notes: number
    clinicSnapshot: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BillAvgAggregateInputType = {
    id?: true
    patientAge?: true
    subtotal?: true
    discountValue?: true
    discountAmount?: true
    gstPercent?: true
    gstAmount?: true
    totalAmount?: true
    paidAmount?: true
    dueAmount?: true
    createdBy?: true
  }

  export type BillSumAggregateInputType = {
    id?: true
    patientAge?: true
    subtotal?: true
    discountValue?: true
    discountAmount?: true
    gstPercent?: true
    gstAmount?: true
    totalAmount?: true
    paidAmount?: true
    dueAmount?: true
    createdBy?: true
  }

  export type BillMinAggregateInputType = {
    id?: true
    billNo?: true
    patientId?: true
    patientName?: true
    patientAge?: true
    patientGender?: true
    patientMobile?: true
    doctorName?: true
    subtotal?: true
    discountType?: true
    discountValue?: true
    discountAmount?: true
    gstPercent?: true
    gstAmount?: true
    totalAmount?: true
    paidAmount?: true
    dueAmount?: true
    paymentMethod?: true
    paymentStatus?: true
    notes?: true
    clinicSnapshot?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillMaxAggregateInputType = {
    id?: true
    billNo?: true
    patientId?: true
    patientName?: true
    patientAge?: true
    patientGender?: true
    patientMobile?: true
    doctorName?: true
    subtotal?: true
    discountType?: true
    discountValue?: true
    discountAmount?: true
    gstPercent?: true
    gstAmount?: true
    totalAmount?: true
    paidAmount?: true
    dueAmount?: true
    paymentMethod?: true
    paymentStatus?: true
    notes?: true
    clinicSnapshot?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillCountAggregateInputType = {
    id?: true
    billNo?: true
    patientId?: true
    patientName?: true
    patientAge?: true
    patientGender?: true
    patientMobile?: true
    doctorName?: true
    subtotal?: true
    discountType?: true
    discountValue?: true
    discountAmount?: true
    gstPercent?: true
    gstAmount?: true
    totalAmount?: true
    paidAmount?: true
    dueAmount?: true
    paymentMethod?: true
    paymentStatus?: true
    notes?: true
    clinicSnapshot?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bill to aggregate.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bills
    **/
    _count?: true | BillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillMaxAggregateInputType
  }

  export type GetBillAggregateType<T extends BillAggregateArgs> = {
        [P in keyof T & keyof AggregateBill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBill[P]>
      : GetScalarType<T[P], AggregateBill[P]>
  }




  export type BillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
    orderBy?: BillOrderByWithAggregationInput | BillOrderByWithAggregationInput[]
    by: BillScalarFieldEnum[] | BillScalarFieldEnum
    having?: BillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillCountAggregateInputType | true
    _avg?: BillAvgAggregateInputType
    _sum?: BillSumAggregateInputType
    _min?: BillMinAggregateInputType
    _max?: BillMaxAggregateInputType
  }

  export type BillGroupByOutputType = {
    id: number
    billNo: string
    patientId: string
    patientName: string
    patientAge: number | null
    patientGender: string | null
    patientMobile: string | null
    doctorName: string | null
    subtotal: number
    discountType: string
    discountValue: number
    discountAmount: number
    gstPercent: number
    gstAmount: number
    totalAmount: number
    paidAmount: number
    dueAmount: number
    paymentMethod: string
    paymentStatus: string
    notes: string | null
    clinicSnapshot: string | null
    createdBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  type GetBillGroupByPayload<T extends BillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillGroupByOutputType[P]>
            : GetScalarType<T[P], BillGroupByOutputType[P]>
        }
      >
    >


  export type BillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNo?: boolean
    patientId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientGender?: boolean
    patientMobile?: boolean
    doctorName?: boolean
    subtotal?: boolean
    discountType?: boolean
    discountValue?: boolean
    discountAmount?: boolean
    gstPercent?: boolean
    gstAmount?: boolean
    totalAmount?: boolean
    paidAmount?: boolean
    dueAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    notes?: boolean
    clinicSnapshot?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    user?: boolean | Bill$userArgs<ExtArgs>
    items?: boolean | Bill$itemsArgs<ExtArgs>
    payments?: boolean | Bill$paymentsArgs<ExtArgs>
    _count?: boolean | BillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNo?: boolean
    patientId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientGender?: boolean
    patientMobile?: boolean
    doctorName?: boolean
    subtotal?: boolean
    discountType?: boolean
    discountValue?: boolean
    discountAmount?: boolean
    gstPercent?: boolean
    gstAmount?: boolean
    totalAmount?: boolean
    paidAmount?: boolean
    dueAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    notes?: boolean
    clinicSnapshot?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    user?: boolean | Bill$userArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectScalar = {
    id?: boolean
    billNo?: boolean
    patientId?: boolean
    patientName?: boolean
    patientAge?: boolean
    patientGender?: boolean
    patientMobile?: boolean
    doctorName?: boolean
    subtotal?: boolean
    discountType?: boolean
    discountValue?: boolean
    discountAmount?: boolean
    gstPercent?: boolean
    gstAmount?: boolean
    totalAmount?: boolean
    paidAmount?: boolean
    dueAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    notes?: boolean
    clinicSnapshot?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    user?: boolean | Bill$userArgs<ExtArgs>
    items?: boolean | Bill$itemsArgs<ExtArgs>
    payments?: boolean | Bill$paymentsArgs<ExtArgs>
    _count?: boolean | BillCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    user?: boolean | Bill$userArgs<ExtArgs>
  }

  export type $BillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bill"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      items: Prisma.$BillItemPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      billNo: string
      patientId: string
      patientName: string
      patientAge: number | null
      patientGender: string | null
      patientMobile: string | null
      doctorName: string | null
      subtotal: number
      discountType: string
      discountValue: number
      discountAmount: number
      gstPercent: number
      gstAmount: number
      totalAmount: number
      paidAmount: number
      dueAmount: number
      paymentMethod: string
      paymentStatus: string
      notes: string | null
      clinicSnapshot: string | null
      createdBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bill"]>
    composites: {}
  }

  type BillGetPayload<S extends boolean | null | undefined | BillDefaultArgs> = $Result.GetResult<Prisma.$BillPayload, S>

  type BillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BillCountAggregateInputType | true
    }

  export interface BillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bill'], meta: { name: 'Bill' } }
    /**
     * Find zero or one Bill that matches the filter.
     * @param {BillFindUniqueArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillFindUniqueArgs>(args: SelectSubset<T, BillFindUniqueArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BillFindUniqueOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillFindUniqueOrThrowArgs>(args: SelectSubset<T, BillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillFindFirstArgs>(args?: SelectSubset<T, BillFindFirstArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillFindFirstOrThrowArgs>(args?: SelectSubset<T, BillFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bills
     * const bills = await prisma.bill.findMany()
     * 
     * // Get first 10 Bills
     * const bills = await prisma.bill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billWithIdOnly = await prisma.bill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillFindManyArgs>(args?: SelectSubset<T, BillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bill.
     * @param {BillCreateArgs} args - Arguments to create a Bill.
     * @example
     * // Create one Bill
     * const Bill = await prisma.bill.create({
     *   data: {
     *     // ... data to create a Bill
     *   }
     * })
     * 
     */
    create<T extends BillCreateArgs>(args: SelectSubset<T, BillCreateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bills.
     * @param {BillCreateManyArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillCreateManyArgs>(args?: SelectSubset<T, BillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bills and returns the data saved in the database.
     * @param {BillCreateManyAndReturnArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bills and only return the `id`
     * const billWithIdOnly = await prisma.bill.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillCreateManyAndReturnArgs>(args?: SelectSubset<T, BillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bill.
     * @param {BillDeleteArgs} args - Arguments to delete one Bill.
     * @example
     * // Delete one Bill
     * const Bill = await prisma.bill.delete({
     *   where: {
     *     // ... filter to delete one Bill
     *   }
     * })
     * 
     */
    delete<T extends BillDeleteArgs>(args: SelectSubset<T, BillDeleteArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bill.
     * @param {BillUpdateArgs} args - Arguments to update one Bill.
     * @example
     * // Update one Bill
     * const bill = await prisma.bill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillUpdateArgs>(args: SelectSubset<T, BillUpdateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bills.
     * @param {BillDeleteManyArgs} args - Arguments to filter Bills to delete.
     * @example
     * // Delete a few Bills
     * const { count } = await prisma.bill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillDeleteManyArgs>(args?: SelectSubset<T, BillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bills
     * const bill = await prisma.bill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillUpdateManyArgs>(args: SelectSubset<T, BillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bill.
     * @param {BillUpsertArgs} args - Arguments to update or create a Bill.
     * @example
     * // Update or create a Bill
     * const bill = await prisma.bill.upsert({
     *   create: {
     *     // ... data to create a Bill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bill we want to update
     *   }
     * })
     */
    upsert<T extends BillUpsertArgs>(args: SelectSubset<T, BillUpsertArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillCountArgs} args - Arguments to filter Bills to count.
     * @example
     * // Count the number of Bills
     * const count = await prisma.bill.count({
     *   where: {
     *     // ... the filter for the Bills we want to count
     *   }
     * })
    **/
    count<T extends BillCountArgs>(
      args?: Subset<T, BillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BillAggregateArgs>(args: Subset<T, BillAggregateArgs>): Prisma.PrismaPromise<GetBillAggregateType<T>>

    /**
     * Group by Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillGroupByArgs['orderBy'] }
        : { orderBy?: BillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bill model
   */
  readonly fields: BillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends Bill$userArgs<ExtArgs> = {}>(args?: Subset<T, Bill$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends Bill$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Bill$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "findMany"> | Null>
    payments<T extends Bill$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Bill$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bill model
   */ 
  interface BillFieldRefs {
    readonly id: FieldRef<"Bill", 'Int'>
    readonly billNo: FieldRef<"Bill", 'String'>
    readonly patientId: FieldRef<"Bill", 'String'>
    readonly patientName: FieldRef<"Bill", 'String'>
    readonly patientAge: FieldRef<"Bill", 'Int'>
    readonly patientGender: FieldRef<"Bill", 'String'>
    readonly patientMobile: FieldRef<"Bill", 'String'>
    readonly doctorName: FieldRef<"Bill", 'String'>
    readonly subtotal: FieldRef<"Bill", 'Float'>
    readonly discountType: FieldRef<"Bill", 'String'>
    readonly discountValue: FieldRef<"Bill", 'Float'>
    readonly discountAmount: FieldRef<"Bill", 'Float'>
    readonly gstPercent: FieldRef<"Bill", 'Float'>
    readonly gstAmount: FieldRef<"Bill", 'Float'>
    readonly totalAmount: FieldRef<"Bill", 'Float'>
    readonly paidAmount: FieldRef<"Bill", 'Float'>
    readonly dueAmount: FieldRef<"Bill", 'Float'>
    readonly paymentMethod: FieldRef<"Bill", 'String'>
    readonly paymentStatus: FieldRef<"Bill", 'String'>
    readonly notes: FieldRef<"Bill", 'String'>
    readonly clinicSnapshot: FieldRef<"Bill", 'String'>
    readonly createdBy: FieldRef<"Bill", 'Int'>
    readonly createdAt: FieldRef<"Bill", 'DateTime'>
    readonly updatedAt: FieldRef<"Bill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bill findUnique
   */
  export type BillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findUniqueOrThrow
   */
  export type BillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findFirst
   */
  export type BillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findFirstOrThrow
   */
  export type BillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findMany
   */
  export type BillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bills to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill create
   */
  export type BillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to create a Bill.
     */
    data: XOR<BillCreateInput, BillUncheckedCreateInput>
  }

  /**
   * Bill createMany
   */
  export type BillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
  }

  /**
   * Bill createManyAndReturn
   */
  export type BillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bill update
   */
  export type BillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to update a Bill.
     */
    data: XOR<BillUpdateInput, BillUncheckedUpdateInput>
    /**
     * Choose, which Bill to update.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill updateMany
   */
  export type BillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bills.
     */
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyInput>
    /**
     * Filter which Bills to update
     */
    where?: BillWhereInput
  }

  /**
   * Bill upsert
   */
  export type BillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The filter to search for the Bill to update in case it exists.
     */
    where: BillWhereUniqueInput
    /**
     * In case the Bill found by the `where` argument doesn't exist, create a new Bill with this data.
     */
    create: XOR<BillCreateInput, BillUncheckedCreateInput>
    /**
     * In case the Bill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillUpdateInput, BillUncheckedUpdateInput>
  }

  /**
   * Bill delete
   */
  export type BillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter which Bill to delete.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill deleteMany
   */
  export type BillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bills to delete
     */
    where?: BillWhereInput
  }

  /**
   * Bill.user
   */
  export type Bill$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Bill.items
   */
  export type Bill$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    where?: BillItemWhereInput
    orderBy?: BillItemOrderByWithRelationInput | BillItemOrderByWithRelationInput[]
    cursor?: BillItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillItemScalarFieldEnum | BillItemScalarFieldEnum[]
  }

  /**
   * Bill.payments
   */
  export type Bill$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Bill without action
   */
  export type BillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
  }


  /**
   * Model BillItem
   */

  export type AggregateBillItem = {
    _count: BillItemCountAggregateOutputType | null
    _avg: BillItemAvgAggregateOutputType | null
    _sum: BillItemSumAggregateOutputType | null
    _min: BillItemMinAggregateOutputType | null
    _max: BillItemMaxAggregateOutputType | null
  }

  export type BillItemAvgAggregateOutputType = {
    id: number | null
    billId: number | null
    itemId: number | null
    quantity: number | null
    unitPrice: number | null
    discount: number | null
    total: number | null
  }

  export type BillItemSumAggregateOutputType = {
    id: number | null
    billId: number | null
    itemId: number | null
    quantity: number | null
    unitPrice: number | null
    discount: number | null
    total: number | null
  }

  export type BillItemMinAggregateOutputType = {
    id: number | null
    billId: number | null
    itemId: number | null
    itemName: string | null
    itemCategory: string | null
    quantity: number | null
    unitPrice: number | null
    discount: number | null
    total: number | null
    createdAt: Date | null
  }

  export type BillItemMaxAggregateOutputType = {
    id: number | null
    billId: number | null
    itemId: number | null
    itemName: string | null
    itemCategory: string | null
    quantity: number | null
    unitPrice: number | null
    discount: number | null
    total: number | null
    createdAt: Date | null
  }

  export type BillItemCountAggregateOutputType = {
    id: number
    billId: number
    itemId: number
    itemName: number
    itemCategory: number
    quantity: number
    unitPrice: number
    discount: number
    total: number
    createdAt: number
    _all: number
  }


  export type BillItemAvgAggregateInputType = {
    id?: true
    billId?: true
    itemId?: true
    quantity?: true
    unitPrice?: true
    discount?: true
    total?: true
  }

  export type BillItemSumAggregateInputType = {
    id?: true
    billId?: true
    itemId?: true
    quantity?: true
    unitPrice?: true
    discount?: true
    total?: true
  }

  export type BillItemMinAggregateInputType = {
    id?: true
    billId?: true
    itemId?: true
    itemName?: true
    itemCategory?: true
    quantity?: true
    unitPrice?: true
    discount?: true
    total?: true
    createdAt?: true
  }

  export type BillItemMaxAggregateInputType = {
    id?: true
    billId?: true
    itemId?: true
    itemName?: true
    itemCategory?: true
    quantity?: true
    unitPrice?: true
    discount?: true
    total?: true
    createdAt?: true
  }

  export type BillItemCountAggregateInputType = {
    id?: true
    billId?: true
    itemId?: true
    itemName?: true
    itemCategory?: true
    quantity?: true
    unitPrice?: true
    discount?: true
    total?: true
    createdAt?: true
    _all?: true
  }

  export type BillItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillItem to aggregate.
     */
    where?: BillItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillItems to fetch.
     */
    orderBy?: BillItemOrderByWithRelationInput | BillItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BillItems
    **/
    _count?: true | BillItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillItemMaxAggregateInputType
  }

  export type GetBillItemAggregateType<T extends BillItemAggregateArgs> = {
        [P in keyof T & keyof AggregateBillItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBillItem[P]>
      : GetScalarType<T[P], AggregateBillItem[P]>
  }




  export type BillItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillItemWhereInput
    orderBy?: BillItemOrderByWithAggregationInput | BillItemOrderByWithAggregationInput[]
    by: BillItemScalarFieldEnum[] | BillItemScalarFieldEnum
    having?: BillItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillItemCountAggregateInputType | true
    _avg?: BillItemAvgAggregateInputType
    _sum?: BillItemSumAggregateInputType
    _min?: BillItemMinAggregateInputType
    _max?: BillItemMaxAggregateInputType
  }

  export type BillItemGroupByOutputType = {
    id: number
    billId: number
    itemId: number | null
    itemName: string
    itemCategory: string
    quantity: number
    unitPrice: number
    discount: number
    total: number
    createdAt: Date
    _count: BillItemCountAggregateOutputType | null
    _avg: BillItemAvgAggregateOutputType | null
    _sum: BillItemSumAggregateOutputType | null
    _min: BillItemMinAggregateOutputType | null
    _max: BillItemMaxAggregateOutputType | null
  }

  type GetBillItemGroupByPayload<T extends BillItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillItemGroupByOutputType[P]>
            : GetScalarType<T[P], BillItemGroupByOutputType[P]>
        }
      >
    >


  export type BillItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    itemId?: boolean
    itemName?: boolean
    itemCategory?: boolean
    quantity?: boolean
    unitPrice?: boolean
    discount?: boolean
    total?: boolean
    createdAt?: boolean
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billItem"]>

  export type BillItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    itemId?: boolean
    itemName?: boolean
    itemCategory?: boolean
    quantity?: boolean
    unitPrice?: boolean
    discount?: boolean
    total?: boolean
    createdAt?: boolean
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billItem"]>

  export type BillItemSelectScalar = {
    id?: boolean
    billId?: boolean
    itemId?: boolean
    itemName?: boolean
    itemCategory?: boolean
    quantity?: boolean
    unitPrice?: boolean
    discount?: boolean
    total?: boolean
    createdAt?: boolean
  }

  export type BillItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }
  export type BillItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }

  export type $BillItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BillItem"
    objects: {
      bill: Prisma.$BillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      billId: number
      itemId: number | null
      itemName: string
      itemCategory: string
      quantity: number
      unitPrice: number
      discount: number
      total: number
      createdAt: Date
    }, ExtArgs["result"]["billItem"]>
    composites: {}
  }

  type BillItemGetPayload<S extends boolean | null | undefined | BillItemDefaultArgs> = $Result.GetResult<Prisma.$BillItemPayload, S>

  type BillItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BillItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BillItemCountAggregateInputType | true
    }

  export interface BillItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BillItem'], meta: { name: 'BillItem' } }
    /**
     * Find zero or one BillItem that matches the filter.
     * @param {BillItemFindUniqueArgs} args - Arguments to find a BillItem
     * @example
     * // Get one BillItem
     * const billItem = await prisma.billItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillItemFindUniqueArgs>(args: SelectSubset<T, BillItemFindUniqueArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BillItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BillItemFindUniqueOrThrowArgs} args - Arguments to find a BillItem
     * @example
     * // Get one BillItem
     * const billItem = await prisma.billItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillItemFindUniqueOrThrowArgs>(args: SelectSubset<T, BillItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BillItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemFindFirstArgs} args - Arguments to find a BillItem
     * @example
     * // Get one BillItem
     * const billItem = await prisma.billItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillItemFindFirstArgs>(args?: SelectSubset<T, BillItemFindFirstArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BillItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemFindFirstOrThrowArgs} args - Arguments to find a BillItem
     * @example
     * // Get one BillItem
     * const billItem = await prisma.billItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillItemFindFirstOrThrowArgs>(args?: SelectSubset<T, BillItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BillItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BillItems
     * const billItems = await prisma.billItem.findMany()
     * 
     * // Get first 10 BillItems
     * const billItems = await prisma.billItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billItemWithIdOnly = await prisma.billItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillItemFindManyArgs>(args?: SelectSubset<T, BillItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BillItem.
     * @param {BillItemCreateArgs} args - Arguments to create a BillItem.
     * @example
     * // Create one BillItem
     * const BillItem = await prisma.billItem.create({
     *   data: {
     *     // ... data to create a BillItem
     *   }
     * })
     * 
     */
    create<T extends BillItemCreateArgs>(args: SelectSubset<T, BillItemCreateArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BillItems.
     * @param {BillItemCreateManyArgs} args - Arguments to create many BillItems.
     * @example
     * // Create many BillItems
     * const billItem = await prisma.billItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillItemCreateManyArgs>(args?: SelectSubset<T, BillItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BillItems and returns the data saved in the database.
     * @param {BillItemCreateManyAndReturnArgs} args - Arguments to create many BillItems.
     * @example
     * // Create many BillItems
     * const billItem = await prisma.billItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BillItems and only return the `id`
     * const billItemWithIdOnly = await prisma.billItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillItemCreateManyAndReturnArgs>(args?: SelectSubset<T, BillItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BillItem.
     * @param {BillItemDeleteArgs} args - Arguments to delete one BillItem.
     * @example
     * // Delete one BillItem
     * const BillItem = await prisma.billItem.delete({
     *   where: {
     *     // ... filter to delete one BillItem
     *   }
     * })
     * 
     */
    delete<T extends BillItemDeleteArgs>(args: SelectSubset<T, BillItemDeleteArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BillItem.
     * @param {BillItemUpdateArgs} args - Arguments to update one BillItem.
     * @example
     * // Update one BillItem
     * const billItem = await prisma.billItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillItemUpdateArgs>(args: SelectSubset<T, BillItemUpdateArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BillItems.
     * @param {BillItemDeleteManyArgs} args - Arguments to filter BillItems to delete.
     * @example
     * // Delete a few BillItems
     * const { count } = await prisma.billItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillItemDeleteManyArgs>(args?: SelectSubset<T, BillItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BillItems
     * const billItem = await prisma.billItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillItemUpdateManyArgs>(args: SelectSubset<T, BillItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BillItem.
     * @param {BillItemUpsertArgs} args - Arguments to update or create a BillItem.
     * @example
     * // Update or create a BillItem
     * const billItem = await prisma.billItem.upsert({
     *   create: {
     *     // ... data to create a BillItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BillItem we want to update
     *   }
     * })
     */
    upsert<T extends BillItemUpsertArgs>(args: SelectSubset<T, BillItemUpsertArgs<ExtArgs>>): Prisma__BillItemClient<$Result.GetResult<Prisma.$BillItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BillItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemCountArgs} args - Arguments to filter BillItems to count.
     * @example
     * // Count the number of BillItems
     * const count = await prisma.billItem.count({
     *   where: {
     *     // ... the filter for the BillItems we want to count
     *   }
     * })
    **/
    count<T extends BillItemCountArgs>(
      args?: Subset<T, BillItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BillItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BillItemAggregateArgs>(args: Subset<T, BillItemAggregateArgs>): Prisma.PrismaPromise<GetBillItemAggregateType<T>>

    /**
     * Group by BillItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BillItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillItemGroupByArgs['orderBy'] }
        : { orderBy?: BillItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BillItem model
   */
  readonly fields: BillItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BillItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bill<T extends BillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BillDefaultArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BillItem model
   */ 
  interface BillItemFieldRefs {
    readonly id: FieldRef<"BillItem", 'Int'>
    readonly billId: FieldRef<"BillItem", 'Int'>
    readonly itemId: FieldRef<"BillItem", 'Int'>
    readonly itemName: FieldRef<"BillItem", 'String'>
    readonly itemCategory: FieldRef<"BillItem", 'String'>
    readonly quantity: FieldRef<"BillItem", 'Int'>
    readonly unitPrice: FieldRef<"BillItem", 'Float'>
    readonly discount: FieldRef<"BillItem", 'Float'>
    readonly total: FieldRef<"BillItem", 'Float'>
    readonly createdAt: FieldRef<"BillItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BillItem findUnique
   */
  export type BillItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * Filter, which BillItem to fetch.
     */
    where: BillItemWhereUniqueInput
  }

  /**
   * BillItem findUniqueOrThrow
   */
  export type BillItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * Filter, which BillItem to fetch.
     */
    where: BillItemWhereUniqueInput
  }

  /**
   * BillItem findFirst
   */
  export type BillItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * Filter, which BillItem to fetch.
     */
    where?: BillItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillItems to fetch.
     */
    orderBy?: BillItemOrderByWithRelationInput | BillItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillItems.
     */
    cursor?: BillItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillItems.
     */
    distinct?: BillItemScalarFieldEnum | BillItemScalarFieldEnum[]
  }

  /**
   * BillItem findFirstOrThrow
   */
  export type BillItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * Filter, which BillItem to fetch.
     */
    where?: BillItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillItems to fetch.
     */
    orderBy?: BillItemOrderByWithRelationInput | BillItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillItems.
     */
    cursor?: BillItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillItems.
     */
    distinct?: BillItemScalarFieldEnum | BillItemScalarFieldEnum[]
  }

  /**
   * BillItem findMany
   */
  export type BillItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * Filter, which BillItems to fetch.
     */
    where?: BillItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillItems to fetch.
     */
    orderBy?: BillItemOrderByWithRelationInput | BillItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BillItems.
     */
    cursor?: BillItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillItems.
     */
    skip?: number
    distinct?: BillItemScalarFieldEnum | BillItemScalarFieldEnum[]
  }

  /**
   * BillItem create
   */
  export type BillItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * The data needed to create a BillItem.
     */
    data: XOR<BillItemCreateInput, BillItemUncheckedCreateInput>
  }

  /**
   * BillItem createMany
   */
  export type BillItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BillItems.
     */
    data: BillItemCreateManyInput | BillItemCreateManyInput[]
  }

  /**
   * BillItem createManyAndReturn
   */
  export type BillItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BillItems.
     */
    data: BillItemCreateManyInput | BillItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BillItem update
   */
  export type BillItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * The data needed to update a BillItem.
     */
    data: XOR<BillItemUpdateInput, BillItemUncheckedUpdateInput>
    /**
     * Choose, which BillItem to update.
     */
    where: BillItemWhereUniqueInput
  }

  /**
   * BillItem updateMany
   */
  export type BillItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BillItems.
     */
    data: XOR<BillItemUpdateManyMutationInput, BillItemUncheckedUpdateManyInput>
    /**
     * Filter which BillItems to update
     */
    where?: BillItemWhereInput
  }

  /**
   * BillItem upsert
   */
  export type BillItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * The filter to search for the BillItem to update in case it exists.
     */
    where: BillItemWhereUniqueInput
    /**
     * In case the BillItem found by the `where` argument doesn't exist, create a new BillItem with this data.
     */
    create: XOR<BillItemCreateInput, BillItemUncheckedCreateInput>
    /**
     * In case the BillItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillItemUpdateInput, BillItemUncheckedUpdateInput>
  }

  /**
   * BillItem delete
   */
  export type BillItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
    /**
     * Filter which BillItem to delete.
     */
    where: BillItemWhereUniqueInput
  }

  /**
   * BillItem deleteMany
   */
  export type BillItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillItems to delete
     */
    where?: BillItemWhereInput
  }

  /**
   * BillItem without action
   */
  export type BillItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillItem
     */
    select?: BillItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillItemInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    billId: number | null
    amount: number | null
    receivedBy: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    billId: number | null
    amount: number | null
    receivedBy: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    billId: number | null
    amount: number | null
    method: string | null
    reference: string | null
    receivedBy: number | null
    paidAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    billId: number | null
    amount: number | null
    method: string | null
    reference: string | null
    receivedBy: number | null
    paidAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    billId: number
    amount: number
    method: number
    reference: number
    receivedBy: number
    paidAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    billId?: true
    amount?: true
    receivedBy?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    billId?: true
    amount?: true
    receivedBy?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    billId?: true
    amount?: true
    method?: true
    reference?: true
    receivedBy?: true
    paidAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    billId?: true
    amount?: true
    method?: true
    reference?: true
    receivedBy?: true
    paidAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    billId?: true
    amount?: true
    method?: true
    reference?: true
    receivedBy?: true
    paidAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    billId: number
    amount: number
    method: string
    reference: string | null
    receivedBy: number | null
    paidAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    amount?: boolean
    method?: boolean
    reference?: boolean
    receivedBy?: boolean
    paidAt?: boolean
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    amount?: boolean
    method?: boolean
    reference?: boolean
    receivedBy?: boolean
    paidAt?: boolean
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    billId?: boolean
    amount?: boolean
    method?: boolean
    reference?: boolean
    receivedBy?: boolean
    paidAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | BillDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      bill: Prisma.$BillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      billId: number
      amount: number
      method: string
      reference: string | null
      receivedBy: number | null
      paidAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bill<T extends BillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BillDefaultArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly billId: FieldRef<"Payment", 'Int'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly method: FieldRef<"Payment", 'String'>
    readonly reference: FieldRef<"Payment", 'String'>
    readonly receivedBy: FieldRef<"Payment", 'Int'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model License
   */

  export type AggregateLicense = {
    _count: LicenseCountAggregateOutputType | null
    _avg: LicenseAvgAggregateOutputType | null
    _sum: LicenseSumAggregateOutputType | null
    _min: LicenseMinAggregateOutputType | null
    _max: LicenseMaxAggregateOutputType | null
  }

  export type LicenseAvgAggregateOutputType = {
    id: number | null
  }

  export type LicenseSumAggregateOutputType = {
    id: number | null
  }

  export type LicenseMinAggregateOutputType = {
    id: number | null
    machineId: string | null
    licenseKey: string | null
    status: string | null
    tier: string | null
    trialStartedAt: Date | null
    activatedAt: Date | null
    expiresAt: Date | null
    updatedAt: Date | null
  }

  export type LicenseMaxAggregateOutputType = {
    id: number | null
    machineId: string | null
    licenseKey: string | null
    status: string | null
    tier: string | null
    trialStartedAt: Date | null
    activatedAt: Date | null
    expiresAt: Date | null
    updatedAt: Date | null
  }

  export type LicenseCountAggregateOutputType = {
    id: number
    machineId: number
    licenseKey: number
    status: number
    tier: number
    trialStartedAt: number
    activatedAt: number
    expiresAt: number
    updatedAt: number
    _all: number
  }


  export type LicenseAvgAggregateInputType = {
    id?: true
  }

  export type LicenseSumAggregateInputType = {
    id?: true
  }

  export type LicenseMinAggregateInputType = {
    id?: true
    machineId?: true
    licenseKey?: true
    status?: true
    tier?: true
    trialStartedAt?: true
    activatedAt?: true
    expiresAt?: true
    updatedAt?: true
  }

  export type LicenseMaxAggregateInputType = {
    id?: true
    machineId?: true
    licenseKey?: true
    status?: true
    tier?: true
    trialStartedAt?: true
    activatedAt?: true
    expiresAt?: true
    updatedAt?: true
  }

  export type LicenseCountAggregateInputType = {
    id?: true
    machineId?: true
    licenseKey?: true
    status?: true
    tier?: true
    trialStartedAt?: true
    activatedAt?: true
    expiresAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LicenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which License to aggregate.
     */
    where?: LicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Licenses to fetch.
     */
    orderBy?: LicenseOrderByWithRelationInput | LicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Licenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Licenses
    **/
    _count?: true | LicenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LicenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LicenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LicenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LicenseMaxAggregateInputType
  }

  export type GetLicenseAggregateType<T extends LicenseAggregateArgs> = {
        [P in keyof T & keyof AggregateLicense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLicense[P]>
      : GetScalarType<T[P], AggregateLicense[P]>
  }




  export type LicenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LicenseWhereInput
    orderBy?: LicenseOrderByWithAggregationInput | LicenseOrderByWithAggregationInput[]
    by: LicenseScalarFieldEnum[] | LicenseScalarFieldEnum
    having?: LicenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LicenseCountAggregateInputType | true
    _avg?: LicenseAvgAggregateInputType
    _sum?: LicenseSumAggregateInputType
    _min?: LicenseMinAggregateInputType
    _max?: LicenseMaxAggregateInputType
  }

  export type LicenseGroupByOutputType = {
    id: number
    machineId: string
    licenseKey: string | null
    status: string
    tier: string
    trialStartedAt: Date
    activatedAt: Date | null
    expiresAt: Date | null
    updatedAt: Date
    _count: LicenseCountAggregateOutputType | null
    _avg: LicenseAvgAggregateOutputType | null
    _sum: LicenseSumAggregateOutputType | null
    _min: LicenseMinAggregateOutputType | null
    _max: LicenseMaxAggregateOutputType | null
  }

  type GetLicenseGroupByPayload<T extends LicenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LicenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LicenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LicenseGroupByOutputType[P]>
            : GetScalarType<T[P], LicenseGroupByOutputType[P]>
        }
      >
    >


  export type LicenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    machineId?: boolean
    licenseKey?: boolean
    status?: boolean
    tier?: boolean
    trialStartedAt?: boolean
    activatedAt?: boolean
    expiresAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["license"]>

  export type LicenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    machineId?: boolean
    licenseKey?: boolean
    status?: boolean
    tier?: boolean
    trialStartedAt?: boolean
    activatedAt?: boolean
    expiresAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["license"]>

  export type LicenseSelectScalar = {
    id?: boolean
    machineId?: boolean
    licenseKey?: boolean
    status?: boolean
    tier?: boolean
    trialStartedAt?: boolean
    activatedAt?: boolean
    expiresAt?: boolean
    updatedAt?: boolean
  }


  export type $LicensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "License"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      machineId: string
      licenseKey: string | null
      status: string
      tier: string
      trialStartedAt: Date
      activatedAt: Date | null
      expiresAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["license"]>
    composites: {}
  }

  type LicenseGetPayload<S extends boolean | null | undefined | LicenseDefaultArgs> = $Result.GetResult<Prisma.$LicensePayload, S>

  type LicenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LicenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LicenseCountAggregateInputType | true
    }

  export interface LicenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['License'], meta: { name: 'License' } }
    /**
     * Find zero or one License that matches the filter.
     * @param {LicenseFindUniqueArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LicenseFindUniqueArgs>(args: SelectSubset<T, LicenseFindUniqueArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one License that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LicenseFindUniqueOrThrowArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LicenseFindUniqueOrThrowArgs>(args: SelectSubset<T, LicenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first License that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseFindFirstArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LicenseFindFirstArgs>(args?: SelectSubset<T, LicenseFindFirstArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first License that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseFindFirstOrThrowArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LicenseFindFirstOrThrowArgs>(args?: SelectSubset<T, LicenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Licenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Licenses
     * const licenses = await prisma.license.findMany()
     * 
     * // Get first 10 Licenses
     * const licenses = await prisma.license.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const licenseWithIdOnly = await prisma.license.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LicenseFindManyArgs>(args?: SelectSubset<T, LicenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a License.
     * @param {LicenseCreateArgs} args - Arguments to create a License.
     * @example
     * // Create one License
     * const License = await prisma.license.create({
     *   data: {
     *     // ... data to create a License
     *   }
     * })
     * 
     */
    create<T extends LicenseCreateArgs>(args: SelectSubset<T, LicenseCreateArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Licenses.
     * @param {LicenseCreateManyArgs} args - Arguments to create many Licenses.
     * @example
     * // Create many Licenses
     * const license = await prisma.license.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LicenseCreateManyArgs>(args?: SelectSubset<T, LicenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Licenses and returns the data saved in the database.
     * @param {LicenseCreateManyAndReturnArgs} args - Arguments to create many Licenses.
     * @example
     * // Create many Licenses
     * const license = await prisma.license.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Licenses and only return the `id`
     * const licenseWithIdOnly = await prisma.license.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LicenseCreateManyAndReturnArgs>(args?: SelectSubset<T, LicenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a License.
     * @param {LicenseDeleteArgs} args - Arguments to delete one License.
     * @example
     * // Delete one License
     * const License = await prisma.license.delete({
     *   where: {
     *     // ... filter to delete one License
     *   }
     * })
     * 
     */
    delete<T extends LicenseDeleteArgs>(args: SelectSubset<T, LicenseDeleteArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one License.
     * @param {LicenseUpdateArgs} args - Arguments to update one License.
     * @example
     * // Update one License
     * const license = await prisma.license.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LicenseUpdateArgs>(args: SelectSubset<T, LicenseUpdateArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Licenses.
     * @param {LicenseDeleteManyArgs} args - Arguments to filter Licenses to delete.
     * @example
     * // Delete a few Licenses
     * const { count } = await prisma.license.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LicenseDeleteManyArgs>(args?: SelectSubset<T, LicenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Licenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Licenses
     * const license = await prisma.license.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LicenseUpdateManyArgs>(args: SelectSubset<T, LicenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one License.
     * @param {LicenseUpsertArgs} args - Arguments to update or create a License.
     * @example
     * // Update or create a License
     * const license = await prisma.license.upsert({
     *   create: {
     *     // ... data to create a License
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the License we want to update
     *   }
     * })
     */
    upsert<T extends LicenseUpsertArgs>(args: SelectSubset<T, LicenseUpsertArgs<ExtArgs>>): Prisma__LicenseClient<$Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Licenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseCountArgs} args - Arguments to filter Licenses to count.
     * @example
     * // Count the number of Licenses
     * const count = await prisma.license.count({
     *   where: {
     *     // ... the filter for the Licenses we want to count
     *   }
     * })
    **/
    count<T extends LicenseCountArgs>(
      args?: Subset<T, LicenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LicenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a License.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LicenseAggregateArgs>(args: Subset<T, LicenseAggregateArgs>): Prisma.PrismaPromise<GetLicenseAggregateType<T>>

    /**
     * Group by License.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LicenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LicenseGroupByArgs['orderBy'] }
        : { orderBy?: LicenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LicenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLicenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the License model
   */
  readonly fields: LicenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for License.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LicenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the License model
   */ 
  interface LicenseFieldRefs {
    readonly id: FieldRef<"License", 'Int'>
    readonly machineId: FieldRef<"License", 'String'>
    readonly licenseKey: FieldRef<"License", 'String'>
    readonly status: FieldRef<"License", 'String'>
    readonly tier: FieldRef<"License", 'String'>
    readonly trialStartedAt: FieldRef<"License", 'DateTime'>
    readonly activatedAt: FieldRef<"License", 'DateTime'>
    readonly expiresAt: FieldRef<"License", 'DateTime'>
    readonly updatedAt: FieldRef<"License", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * License findUnique
   */
  export type LicenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * Filter, which License to fetch.
     */
    where: LicenseWhereUniqueInput
  }

  /**
   * License findUniqueOrThrow
   */
  export type LicenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * Filter, which License to fetch.
     */
    where: LicenseWhereUniqueInput
  }

  /**
   * License findFirst
   */
  export type LicenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * Filter, which License to fetch.
     */
    where?: LicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Licenses to fetch.
     */
    orderBy?: LicenseOrderByWithRelationInput | LicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Licenses.
     */
    cursor?: LicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Licenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Licenses.
     */
    distinct?: LicenseScalarFieldEnum | LicenseScalarFieldEnum[]
  }

  /**
   * License findFirstOrThrow
   */
  export type LicenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * Filter, which License to fetch.
     */
    where?: LicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Licenses to fetch.
     */
    orderBy?: LicenseOrderByWithRelationInput | LicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Licenses.
     */
    cursor?: LicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Licenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Licenses.
     */
    distinct?: LicenseScalarFieldEnum | LicenseScalarFieldEnum[]
  }

  /**
   * License findMany
   */
  export type LicenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * Filter, which Licenses to fetch.
     */
    where?: LicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Licenses to fetch.
     */
    orderBy?: LicenseOrderByWithRelationInput | LicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Licenses.
     */
    cursor?: LicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Licenses.
     */
    skip?: number
    distinct?: LicenseScalarFieldEnum | LicenseScalarFieldEnum[]
  }

  /**
   * License create
   */
  export type LicenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * The data needed to create a License.
     */
    data: XOR<LicenseCreateInput, LicenseUncheckedCreateInput>
  }

  /**
   * License createMany
   */
  export type LicenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Licenses.
     */
    data: LicenseCreateManyInput | LicenseCreateManyInput[]
  }

  /**
   * License createManyAndReturn
   */
  export type LicenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Licenses.
     */
    data: LicenseCreateManyInput | LicenseCreateManyInput[]
  }

  /**
   * License update
   */
  export type LicenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * The data needed to update a License.
     */
    data: XOR<LicenseUpdateInput, LicenseUncheckedUpdateInput>
    /**
     * Choose, which License to update.
     */
    where: LicenseWhereUniqueInput
  }

  /**
   * License updateMany
   */
  export type LicenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Licenses.
     */
    data: XOR<LicenseUpdateManyMutationInput, LicenseUncheckedUpdateManyInput>
    /**
     * Filter which Licenses to update
     */
    where?: LicenseWhereInput
  }

  /**
   * License upsert
   */
  export type LicenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * The filter to search for the License to update in case it exists.
     */
    where: LicenseWhereUniqueInput
    /**
     * In case the License found by the `where` argument doesn't exist, create a new License with this data.
     */
    create: XOR<LicenseCreateInput, LicenseUncheckedCreateInput>
    /**
     * In case the License was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LicenseUpdateInput, LicenseUncheckedUpdateInput>
  }

  /**
   * License delete
   */
  export type LicenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
    /**
     * Filter which License to delete.
     */
    where: LicenseWhereUniqueInput
  }

  /**
   * License deleteMany
   */
  export type LicenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Licenses to delete
     */
    where?: LicenseWhereInput
  }

  /**
   * License without action
   */
  export type LicenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: LicenseSelect<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ActivityLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    details: number
    createdAt: number
    _all: number
  }


  export type ActivityLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ActivityLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _avg?: ActivityLogAvgAggregateInputType
    _sum?: ActivityLogSumAggregateInputType
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: number
    userId: number | null
    action: string
    details: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number | null
      action: string
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ActivityLog$userArgs<ExtArgs> = {}>(args?: Subset<T, ActivityLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */ 
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'Int'>
    readonly userId: FieldRef<"ActivityLog", 'Int'>
    readonly action: FieldRef<"ActivityLog", 'String'>
    readonly details: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
  }

  /**
   * ActivityLog.user
   */
  export type ActivityLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClinicSettingsScalarFieldEnum: {
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

  export type ClinicSettingsScalarFieldEnum = (typeof ClinicSettingsScalarFieldEnum)[keyof typeof ClinicSettingsScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PatientScalarFieldEnum: {
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

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
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

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const CatalogItemScalarFieldEnum: {
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

  export type CatalogItemScalarFieldEnum = (typeof CatalogItemScalarFieldEnum)[keyof typeof CatalogItemScalarFieldEnum]


  export const BillScalarFieldEnum: {
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

  export type BillScalarFieldEnum = (typeof BillScalarFieldEnum)[keyof typeof BillScalarFieldEnum]


  export const BillItemScalarFieldEnum: {
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

  export type BillItemScalarFieldEnum = (typeof BillItemScalarFieldEnum)[keyof typeof BillItemScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    billId: 'billId',
    amount: 'amount',
    method: 'method',
    reference: 'reference',
    receivedBy: 'receivedBy',
    paidAt: 'paidAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const LicenseScalarFieldEnum: {
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

  export type LicenseScalarFieldEnum = (typeof LicenseScalarFieldEnum)[keyof typeof LicenseScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ClinicSettingsWhereInput = {
    AND?: ClinicSettingsWhereInput | ClinicSettingsWhereInput[]
    OR?: ClinicSettingsWhereInput[]
    NOT?: ClinicSettingsWhereInput | ClinicSettingsWhereInput[]
    id?: IntFilter<"ClinicSettings"> | number
    clinicName?: StringFilter<"ClinicSettings"> | string
    tagline?: StringNullableFilter<"ClinicSettings"> | string | null
    address?: StringFilter<"ClinicSettings"> | string
    phone?: StringFilter<"ClinicSettings"> | string
    email?: StringNullableFilter<"ClinicSettings"> | string | null
    website?: StringNullableFilter<"ClinicSettings"> | string | null
    doctorName?: StringNullableFilter<"ClinicSettings"> | string | null
    doctorQualification?: StringNullableFilter<"ClinicSettings"> | string | null
    doctorRegNo?: StringNullableFilter<"ClinicSettings"> | string | null
    dlNumber?: StringNullableFilter<"ClinicSettings"> | string | null
    gstin?: StringNullableFilter<"ClinicSettings"> | string | null
    currencySymbol?: StringFilter<"ClinicSettings"> | string
    footerNote?: StringNullableFilter<"ClinicSettings"> | string | null
    termsConditions?: StringNullableFilter<"ClinicSettings"> | string | null
    logo?: BytesNullableFilter<"ClinicSettings"> | Buffer | null
    doctorSignature?: BytesNullableFilter<"ClinicSettings"> | Buffer | null
    clinicStamp?: BytesNullableFilter<"ClinicSettings"> | Buffer | null
    letterhead?: BoolFilter<"ClinicSettings"> | boolean
    printShowLogo?: BoolFilter<"ClinicSettings"> | boolean
    printShowSignature?: BoolFilter<"ClinicSettings"> | boolean
    printThermal?: BoolFilter<"ClinicSettings"> | boolean
    printPaperSize?: StringFilter<"ClinicSettings"> | string
    printColor?: StringFilter<"ClinicSettings"> | string
    licenseKey?: StringNullableFilter<"ClinicSettings"> | string | null
    createdAt?: DateTimeFilter<"ClinicSettings"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicSettings"> | Date | string
  }

  export type ClinicSettingsOrderByWithRelationInput = {
    id?: SortOrder
    clinicName?: SortOrder
    tagline?: SortOrderInput | SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    doctorName?: SortOrderInput | SortOrder
    doctorQualification?: SortOrderInput | SortOrder
    doctorRegNo?: SortOrderInput | SortOrder
    dlNumber?: SortOrderInput | SortOrder
    gstin?: SortOrderInput | SortOrder
    currencySymbol?: SortOrder
    footerNote?: SortOrderInput | SortOrder
    termsConditions?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    doctorSignature?: SortOrderInput | SortOrder
    clinicStamp?: SortOrderInput | SortOrder
    letterhead?: SortOrder
    printShowLogo?: SortOrder
    printShowSignature?: SortOrder
    printThermal?: SortOrder
    printPaperSize?: SortOrder
    printColor?: SortOrder
    licenseKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClinicSettingsWhereInput | ClinicSettingsWhereInput[]
    OR?: ClinicSettingsWhereInput[]
    NOT?: ClinicSettingsWhereInput | ClinicSettingsWhereInput[]
    clinicName?: StringFilter<"ClinicSettings"> | string
    tagline?: StringNullableFilter<"ClinicSettings"> | string | null
    address?: StringFilter<"ClinicSettings"> | string
    phone?: StringFilter<"ClinicSettings"> | string
    email?: StringNullableFilter<"ClinicSettings"> | string | null
    website?: StringNullableFilter<"ClinicSettings"> | string | null
    doctorName?: StringNullableFilter<"ClinicSettings"> | string | null
    doctorQualification?: StringNullableFilter<"ClinicSettings"> | string | null
    doctorRegNo?: StringNullableFilter<"ClinicSettings"> | string | null
    dlNumber?: StringNullableFilter<"ClinicSettings"> | string | null
    gstin?: StringNullableFilter<"ClinicSettings"> | string | null
    currencySymbol?: StringFilter<"ClinicSettings"> | string
    footerNote?: StringNullableFilter<"ClinicSettings"> | string | null
    termsConditions?: StringNullableFilter<"ClinicSettings"> | string | null
    logo?: BytesNullableFilter<"ClinicSettings"> | Buffer | null
    doctorSignature?: BytesNullableFilter<"ClinicSettings"> | Buffer | null
    clinicStamp?: BytesNullableFilter<"ClinicSettings"> | Buffer | null
    letterhead?: BoolFilter<"ClinicSettings"> | boolean
    printShowLogo?: BoolFilter<"ClinicSettings"> | boolean
    printShowSignature?: BoolFilter<"ClinicSettings"> | boolean
    printThermal?: BoolFilter<"ClinicSettings"> | boolean
    printPaperSize?: StringFilter<"ClinicSettings"> | string
    printColor?: StringFilter<"ClinicSettings"> | string
    licenseKey?: StringNullableFilter<"ClinicSettings"> | string | null
    createdAt?: DateTimeFilter<"ClinicSettings"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicSettings"> | Date | string
  }, "id">

  export type ClinicSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    clinicName?: SortOrder
    tagline?: SortOrderInput | SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    doctorName?: SortOrderInput | SortOrder
    doctorQualification?: SortOrderInput | SortOrder
    doctorRegNo?: SortOrderInput | SortOrder
    dlNumber?: SortOrderInput | SortOrder
    gstin?: SortOrderInput | SortOrder
    currencySymbol?: SortOrder
    footerNote?: SortOrderInput | SortOrder
    termsConditions?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    doctorSignature?: SortOrderInput | SortOrder
    clinicStamp?: SortOrderInput | SortOrder
    letterhead?: SortOrder
    printShowLogo?: SortOrder
    printShowSignature?: SortOrder
    printThermal?: SortOrder
    printPaperSize?: SortOrder
    printColor?: SortOrder
    licenseKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicSettingsCountOrderByAggregateInput
    _avg?: ClinicSettingsAvgOrderByAggregateInput
    _max?: ClinicSettingsMaxOrderByAggregateInput
    _min?: ClinicSettingsMinOrderByAggregateInput
    _sum?: ClinicSettingsSumOrderByAggregateInput
  }

  export type ClinicSettingsScalarWhereWithAggregatesInput = {
    AND?: ClinicSettingsScalarWhereWithAggregatesInput | ClinicSettingsScalarWhereWithAggregatesInput[]
    OR?: ClinicSettingsScalarWhereWithAggregatesInput[]
    NOT?: ClinicSettingsScalarWhereWithAggregatesInput | ClinicSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClinicSettings"> | number
    clinicName?: StringWithAggregatesFilter<"ClinicSettings"> | string
    tagline?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    address?: StringWithAggregatesFilter<"ClinicSettings"> | string
    phone?: StringWithAggregatesFilter<"ClinicSettings"> | string
    email?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    website?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    doctorName?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    doctorQualification?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    doctorRegNo?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    dlNumber?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    gstin?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    currencySymbol?: StringWithAggregatesFilter<"ClinicSettings"> | string
    footerNote?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    termsConditions?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    logo?: BytesNullableWithAggregatesFilter<"ClinicSettings"> | Buffer | null
    doctorSignature?: BytesNullableWithAggregatesFilter<"ClinicSettings"> | Buffer | null
    clinicStamp?: BytesNullableWithAggregatesFilter<"ClinicSettings"> | Buffer | null
    letterhead?: BoolWithAggregatesFilter<"ClinicSettings"> | boolean
    printShowLogo?: BoolWithAggregatesFilter<"ClinicSettings"> | boolean
    printShowSignature?: BoolWithAggregatesFilter<"ClinicSettings"> | boolean
    printThermal?: BoolWithAggregatesFilter<"ClinicSettings"> | boolean
    printPaperSize?: StringWithAggregatesFilter<"ClinicSettings"> | string
    printColor?: StringWithAggregatesFilter<"ClinicSettings"> | string
    licenseKey?: StringNullableWithAggregatesFilter<"ClinicSettings"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ClinicSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClinicSettings"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    recoveryHash?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    avatar?: BytesNullableFilter<"User"> | Buffer | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    patients?: PatientListRelationFilter
    bills?: BillListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    recoveryHash?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    patients?: PatientOrderByRelationAggregateInput
    bills?: BillOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    recoveryHash?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    avatar?: BytesNullableFilter<"User"> | Buffer | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    patients?: PatientListRelationFilter
    bills?: BillListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    recoveryHash?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    recoveryHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    avatar?: BytesNullableWithAggregatesFilter<"User"> | Buffer | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    uhid?: StringNullableFilter<"Patient"> | string | null
    name?: StringFilter<"Patient"> | string
    age?: IntFilter<"Patient"> | number
    ageUnit?: StringFilter<"Patient"> | string
    gender?: StringFilter<"Patient"> | string
    mobile?: StringFilter<"Patient"> | string
    email?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    emergencyContact?: StringNullableFilter<"Patient"> | string | null
    referredDoctor?: StringNullableFilter<"Patient"> | string | null
    createdBy?: IntNullableFilter<"Patient"> | number | null
    registeredAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    bills?: BillListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    uhid?: SortOrderInput | SortOrder
    name?: SortOrder
    age?: SortOrder
    ageUnit?: SortOrder
    gender?: SortOrder
    mobile?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    emergencyContact?: SortOrderInput | SortOrder
    referredDoctor?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    bills?: BillOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    uhid?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    age?: IntFilter<"Patient"> | number
    ageUnit?: StringFilter<"Patient"> | string
    gender?: StringFilter<"Patient"> | string
    mobile?: StringFilter<"Patient"> | string
    email?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    emergencyContact?: StringNullableFilter<"Patient"> | string | null
    referredDoctor?: StringNullableFilter<"Patient"> | string | null
    createdBy?: IntNullableFilter<"Patient"> | number | null
    registeredAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    bills?: BillListRelationFilter
  }, "id" | "uhid">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    uhid?: SortOrderInput | SortOrder
    name?: SortOrder
    age?: SortOrder
    ageUnit?: SortOrder
    gender?: SortOrder
    mobile?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    emergencyContact?: SortOrderInput | SortOrder
    referredDoctor?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    uhid?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    name?: StringWithAggregatesFilter<"Patient"> | string
    age?: IntWithAggregatesFilter<"Patient"> | number
    ageUnit?: StringWithAggregatesFilter<"Patient"> | string
    gender?: StringWithAggregatesFilter<"Patient"> | string
    mobile?: StringWithAggregatesFilter<"Patient"> | string
    email?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    address?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    bloodGroup?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    emergencyContact?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    referredDoctor?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    createdBy?: IntNullableWithAggregatesFilter<"Patient"> | number | null
    registeredAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    id?: IntFilter<"Doctor"> | number
    name?: StringFilter<"Doctor"> | string
    qualification?: StringNullableFilter<"Doctor"> | string | null
    specialization?: StringNullableFilter<"Doctor"> | string | null
    hospital?: StringNullableFilter<"Doctor"> | string | null
    mobile?: StringNullableFilter<"Doctor"> | string | null
    email?: StringNullableFilter<"Doctor"> | string | null
    consultationFee?: FloatFilter<"Doctor"> | number
    commission?: FloatFilter<"Doctor"> | number
    isActive?: BoolFilter<"Doctor"> | boolean
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
  }

  export type DoctorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrderInput | SortOrder
    specialization?: SortOrderInput | SortOrder
    hospital?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    name?: StringFilter<"Doctor"> | string
    qualification?: StringNullableFilter<"Doctor"> | string | null
    specialization?: StringNullableFilter<"Doctor"> | string | null
    hospital?: StringNullableFilter<"Doctor"> | string | null
    mobile?: StringNullableFilter<"Doctor"> | string | null
    email?: StringNullableFilter<"Doctor"> | string | null
    consultationFee?: FloatFilter<"Doctor"> | number
    commission?: FloatFilter<"Doctor"> | number
    isActive?: BoolFilter<"Doctor"> | boolean
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
  }, "id">

  export type DoctorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrderInput | SortOrder
    specialization?: SortOrderInput | SortOrder
    hospital?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _avg?: DoctorAvgOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
    _sum?: DoctorSumOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Doctor"> | number
    name?: StringWithAggregatesFilter<"Doctor"> | string
    qualification?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    specialization?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    hospital?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    mobile?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    email?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    consultationFee?: FloatWithAggregatesFilter<"Doctor"> | number
    commission?: FloatWithAggregatesFilter<"Doctor"> | number
    isActive?: BoolWithAggregatesFilter<"Doctor"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
  }

  export type CatalogItemWhereInput = {
    AND?: CatalogItemWhereInput | CatalogItemWhereInput[]
    OR?: CatalogItemWhereInput[]
    NOT?: CatalogItemWhereInput | CatalogItemWhereInput[]
    id?: IntFilter<"CatalogItem"> | number
    code?: StringNullableFilter<"CatalogItem"> | string | null
    name?: StringFilter<"CatalogItem"> | string
    category?: StringFilter<"CatalogItem"> | string
    defaultPrice?: FloatFilter<"CatalogItem"> | number
    costPrice?: FloatNullableFilter<"CatalogItem"> | number | null
    stock?: IntNullableFilter<"CatalogItem"> | number | null
    unit?: StringNullableFilter<"CatalogItem"> | string | null
    taxPercent?: FloatNullableFilter<"CatalogItem"> | number | null
    isCustom?: BoolFilter<"CatalogItem"> | boolean
    isActive?: BoolFilter<"CatalogItem"> | boolean
    createdAt?: DateTimeFilter<"CatalogItem"> | Date | string
    updatedAt?: DateTimeFilter<"CatalogItem"> | Date | string
    deletedAt?: DateTimeNullableFilter<"CatalogItem"> | Date | string | null
  }

  export type CatalogItemOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrderInput | SortOrder
    name?: SortOrder
    category?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrderInput | SortOrder
    stock?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    taxPercent?: SortOrderInput | SortOrder
    isCustom?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
  }

  export type CatalogItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: CatalogItemWhereInput | CatalogItemWhereInput[]
    OR?: CatalogItemWhereInput[]
    NOT?: CatalogItemWhereInput | CatalogItemWhereInput[]
    name?: StringFilter<"CatalogItem"> | string
    category?: StringFilter<"CatalogItem"> | string
    defaultPrice?: FloatFilter<"CatalogItem"> | number
    costPrice?: FloatNullableFilter<"CatalogItem"> | number | null
    stock?: IntNullableFilter<"CatalogItem"> | number | null
    unit?: StringNullableFilter<"CatalogItem"> | string | null
    taxPercent?: FloatNullableFilter<"CatalogItem"> | number | null
    isCustom?: BoolFilter<"CatalogItem"> | boolean
    isActive?: BoolFilter<"CatalogItem"> | boolean
    createdAt?: DateTimeFilter<"CatalogItem"> | Date | string
    updatedAt?: DateTimeFilter<"CatalogItem"> | Date | string
    deletedAt?: DateTimeNullableFilter<"CatalogItem"> | Date | string | null
  }, "id" | "code">

  export type CatalogItemOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrderInput | SortOrder
    name?: SortOrder
    category?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrderInput | SortOrder
    stock?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    taxPercent?: SortOrderInput | SortOrder
    isCustom?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: CatalogItemCountOrderByAggregateInput
    _avg?: CatalogItemAvgOrderByAggregateInput
    _max?: CatalogItemMaxOrderByAggregateInput
    _min?: CatalogItemMinOrderByAggregateInput
    _sum?: CatalogItemSumOrderByAggregateInput
  }

  export type CatalogItemScalarWhereWithAggregatesInput = {
    AND?: CatalogItemScalarWhereWithAggregatesInput | CatalogItemScalarWhereWithAggregatesInput[]
    OR?: CatalogItemScalarWhereWithAggregatesInput[]
    NOT?: CatalogItemScalarWhereWithAggregatesInput | CatalogItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CatalogItem"> | number
    code?: StringNullableWithAggregatesFilter<"CatalogItem"> | string | null
    name?: StringWithAggregatesFilter<"CatalogItem"> | string
    category?: StringWithAggregatesFilter<"CatalogItem"> | string
    defaultPrice?: FloatWithAggregatesFilter<"CatalogItem"> | number
    costPrice?: FloatNullableWithAggregatesFilter<"CatalogItem"> | number | null
    stock?: IntNullableWithAggregatesFilter<"CatalogItem"> | number | null
    unit?: StringNullableWithAggregatesFilter<"CatalogItem"> | string | null
    taxPercent?: FloatNullableWithAggregatesFilter<"CatalogItem"> | number | null
    isCustom?: BoolWithAggregatesFilter<"CatalogItem"> | boolean
    isActive?: BoolWithAggregatesFilter<"CatalogItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CatalogItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CatalogItem"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"CatalogItem"> | Date | string | null
  }

  export type BillWhereInput = {
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    id?: IntFilter<"Bill"> | number
    billNo?: StringFilter<"Bill"> | string
    patientId?: StringFilter<"Bill"> | string
    patientName?: StringFilter<"Bill"> | string
    patientAge?: IntNullableFilter<"Bill"> | number | null
    patientGender?: StringNullableFilter<"Bill"> | string | null
    patientMobile?: StringNullableFilter<"Bill"> | string | null
    doctorName?: StringNullableFilter<"Bill"> | string | null
    subtotal?: FloatFilter<"Bill"> | number
    discountType?: StringFilter<"Bill"> | string
    discountValue?: FloatFilter<"Bill"> | number
    discountAmount?: FloatFilter<"Bill"> | number
    gstPercent?: FloatFilter<"Bill"> | number
    gstAmount?: FloatFilter<"Bill"> | number
    totalAmount?: FloatFilter<"Bill"> | number
    paidAmount?: FloatFilter<"Bill"> | number
    dueAmount?: FloatFilter<"Bill"> | number
    paymentMethod?: StringFilter<"Bill"> | string
    paymentStatus?: StringFilter<"Bill"> | string
    notes?: StringNullableFilter<"Bill"> | string | null
    clinicSnapshot?: StringNullableFilter<"Bill"> | string | null
    createdBy?: IntNullableFilter<"Bill"> | number | null
    createdAt?: DateTimeFilter<"Bill"> | Date | string
    updatedAt?: DateTimeFilter<"Bill"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    items?: BillItemListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type BillOrderByWithRelationInput = {
    id?: SortOrder
    billNo?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrderInput | SortOrder
    patientGender?: SortOrderInput | SortOrder
    patientMobile?: SortOrderInput | SortOrder
    doctorName?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrderInput | SortOrder
    clinicSnapshot?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    items?: BillItemOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type BillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    billNo?: string
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    patientId?: StringFilter<"Bill"> | string
    patientName?: StringFilter<"Bill"> | string
    patientAge?: IntNullableFilter<"Bill"> | number | null
    patientGender?: StringNullableFilter<"Bill"> | string | null
    patientMobile?: StringNullableFilter<"Bill"> | string | null
    doctorName?: StringNullableFilter<"Bill"> | string | null
    subtotal?: FloatFilter<"Bill"> | number
    discountType?: StringFilter<"Bill"> | string
    discountValue?: FloatFilter<"Bill"> | number
    discountAmount?: FloatFilter<"Bill"> | number
    gstPercent?: FloatFilter<"Bill"> | number
    gstAmount?: FloatFilter<"Bill"> | number
    totalAmount?: FloatFilter<"Bill"> | number
    paidAmount?: FloatFilter<"Bill"> | number
    dueAmount?: FloatFilter<"Bill"> | number
    paymentMethod?: StringFilter<"Bill"> | string
    paymentStatus?: StringFilter<"Bill"> | string
    notes?: StringNullableFilter<"Bill"> | string | null
    clinicSnapshot?: StringNullableFilter<"Bill"> | string | null
    createdBy?: IntNullableFilter<"Bill"> | number | null
    createdAt?: DateTimeFilter<"Bill"> | Date | string
    updatedAt?: DateTimeFilter<"Bill"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    items?: BillItemListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "billNo">

  export type BillOrderByWithAggregationInput = {
    id?: SortOrder
    billNo?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrderInput | SortOrder
    patientGender?: SortOrderInput | SortOrder
    patientMobile?: SortOrderInput | SortOrder
    doctorName?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrderInput | SortOrder
    clinicSnapshot?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BillCountOrderByAggregateInput
    _avg?: BillAvgOrderByAggregateInput
    _max?: BillMaxOrderByAggregateInput
    _min?: BillMinOrderByAggregateInput
    _sum?: BillSumOrderByAggregateInput
  }

  export type BillScalarWhereWithAggregatesInput = {
    AND?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    OR?: BillScalarWhereWithAggregatesInput[]
    NOT?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Bill"> | number
    billNo?: StringWithAggregatesFilter<"Bill"> | string
    patientId?: StringWithAggregatesFilter<"Bill"> | string
    patientName?: StringWithAggregatesFilter<"Bill"> | string
    patientAge?: IntNullableWithAggregatesFilter<"Bill"> | number | null
    patientGender?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    patientMobile?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    doctorName?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    subtotal?: FloatWithAggregatesFilter<"Bill"> | number
    discountType?: StringWithAggregatesFilter<"Bill"> | string
    discountValue?: FloatWithAggregatesFilter<"Bill"> | number
    discountAmount?: FloatWithAggregatesFilter<"Bill"> | number
    gstPercent?: FloatWithAggregatesFilter<"Bill"> | number
    gstAmount?: FloatWithAggregatesFilter<"Bill"> | number
    totalAmount?: FloatWithAggregatesFilter<"Bill"> | number
    paidAmount?: FloatWithAggregatesFilter<"Bill"> | number
    dueAmount?: FloatWithAggregatesFilter<"Bill"> | number
    paymentMethod?: StringWithAggregatesFilter<"Bill"> | string
    paymentStatus?: StringWithAggregatesFilter<"Bill"> | string
    notes?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    clinicSnapshot?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    createdBy?: IntNullableWithAggregatesFilter<"Bill"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
  }

  export type BillItemWhereInput = {
    AND?: BillItemWhereInput | BillItemWhereInput[]
    OR?: BillItemWhereInput[]
    NOT?: BillItemWhereInput | BillItemWhereInput[]
    id?: IntFilter<"BillItem"> | number
    billId?: IntFilter<"BillItem"> | number
    itemId?: IntNullableFilter<"BillItem"> | number | null
    itemName?: StringFilter<"BillItem"> | string
    itemCategory?: StringFilter<"BillItem"> | string
    quantity?: IntFilter<"BillItem"> | number
    unitPrice?: FloatFilter<"BillItem"> | number
    discount?: FloatFilter<"BillItem"> | number
    total?: FloatFilter<"BillItem"> | number
    createdAt?: DateTimeFilter<"BillItem"> | Date | string
    bill?: XOR<BillRelationFilter, BillWhereInput>
  }

  export type BillItemOrderByWithRelationInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrderInput | SortOrder
    itemName?: SortOrder
    itemCategory?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    bill?: BillOrderByWithRelationInput
  }

  export type BillItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BillItemWhereInput | BillItemWhereInput[]
    OR?: BillItemWhereInput[]
    NOT?: BillItemWhereInput | BillItemWhereInput[]
    billId?: IntFilter<"BillItem"> | number
    itemId?: IntNullableFilter<"BillItem"> | number | null
    itemName?: StringFilter<"BillItem"> | string
    itemCategory?: StringFilter<"BillItem"> | string
    quantity?: IntFilter<"BillItem"> | number
    unitPrice?: FloatFilter<"BillItem"> | number
    discount?: FloatFilter<"BillItem"> | number
    total?: FloatFilter<"BillItem"> | number
    createdAt?: DateTimeFilter<"BillItem"> | Date | string
    bill?: XOR<BillRelationFilter, BillWhereInput>
  }, "id">

  export type BillItemOrderByWithAggregationInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrderInput | SortOrder
    itemName?: SortOrder
    itemCategory?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    _count?: BillItemCountOrderByAggregateInput
    _avg?: BillItemAvgOrderByAggregateInput
    _max?: BillItemMaxOrderByAggregateInput
    _min?: BillItemMinOrderByAggregateInput
    _sum?: BillItemSumOrderByAggregateInput
  }

  export type BillItemScalarWhereWithAggregatesInput = {
    AND?: BillItemScalarWhereWithAggregatesInput | BillItemScalarWhereWithAggregatesInput[]
    OR?: BillItemScalarWhereWithAggregatesInput[]
    NOT?: BillItemScalarWhereWithAggregatesInput | BillItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BillItem"> | number
    billId?: IntWithAggregatesFilter<"BillItem"> | number
    itemId?: IntNullableWithAggregatesFilter<"BillItem"> | number | null
    itemName?: StringWithAggregatesFilter<"BillItem"> | string
    itemCategory?: StringWithAggregatesFilter<"BillItem"> | string
    quantity?: IntWithAggregatesFilter<"BillItem"> | number
    unitPrice?: FloatWithAggregatesFilter<"BillItem"> | number
    discount?: FloatWithAggregatesFilter<"BillItem"> | number
    total?: FloatWithAggregatesFilter<"BillItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BillItem"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    billId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    method?: StringFilter<"Payment"> | string
    reference?: StringNullableFilter<"Payment"> | string | null
    receivedBy?: IntNullableFilter<"Payment"> | number | null
    paidAt?: DateTimeFilter<"Payment"> | Date | string
    bill?: XOR<BillRelationFilter, BillWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    reference?: SortOrderInput | SortOrder
    receivedBy?: SortOrderInput | SortOrder
    paidAt?: SortOrder
    bill?: BillOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    billId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    method?: StringFilter<"Payment"> | string
    reference?: StringNullableFilter<"Payment"> | string | null
    receivedBy?: IntNullableFilter<"Payment"> | number | null
    paidAt?: DateTimeFilter<"Payment"> | Date | string
    bill?: XOR<BillRelationFilter, BillWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    reference?: SortOrderInput | SortOrder
    receivedBy?: SortOrderInput | SortOrder
    paidAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    billId?: IntWithAggregatesFilter<"Payment"> | number
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    method?: StringWithAggregatesFilter<"Payment"> | string
    reference?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    receivedBy?: IntNullableWithAggregatesFilter<"Payment"> | number | null
    paidAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type LicenseWhereInput = {
    AND?: LicenseWhereInput | LicenseWhereInput[]
    OR?: LicenseWhereInput[]
    NOT?: LicenseWhereInput | LicenseWhereInput[]
    id?: IntFilter<"License"> | number
    machineId?: StringFilter<"License"> | string
    licenseKey?: StringNullableFilter<"License"> | string | null
    status?: StringFilter<"License"> | string
    tier?: StringFilter<"License"> | string
    trialStartedAt?: DateTimeFilter<"License"> | Date | string
    activatedAt?: DateTimeNullableFilter<"License"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"License"> | Date | string | null
    updatedAt?: DateTimeFilter<"License"> | Date | string
  }

  export type LicenseOrderByWithRelationInput = {
    id?: SortOrder
    machineId?: SortOrder
    licenseKey?: SortOrderInput | SortOrder
    status?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    activatedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type LicenseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    machineId?: string
    AND?: LicenseWhereInput | LicenseWhereInput[]
    OR?: LicenseWhereInput[]
    NOT?: LicenseWhereInput | LicenseWhereInput[]
    licenseKey?: StringNullableFilter<"License"> | string | null
    status?: StringFilter<"License"> | string
    tier?: StringFilter<"License"> | string
    trialStartedAt?: DateTimeFilter<"License"> | Date | string
    activatedAt?: DateTimeNullableFilter<"License"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"License"> | Date | string | null
    updatedAt?: DateTimeFilter<"License"> | Date | string
  }, "id" | "machineId">

  export type LicenseOrderByWithAggregationInput = {
    id?: SortOrder
    machineId?: SortOrder
    licenseKey?: SortOrderInput | SortOrder
    status?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    activatedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: LicenseCountOrderByAggregateInput
    _avg?: LicenseAvgOrderByAggregateInput
    _max?: LicenseMaxOrderByAggregateInput
    _min?: LicenseMinOrderByAggregateInput
    _sum?: LicenseSumOrderByAggregateInput
  }

  export type LicenseScalarWhereWithAggregatesInput = {
    AND?: LicenseScalarWhereWithAggregatesInput | LicenseScalarWhereWithAggregatesInput[]
    OR?: LicenseScalarWhereWithAggregatesInput[]
    NOT?: LicenseScalarWhereWithAggregatesInput | LicenseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"License"> | number
    machineId?: StringWithAggregatesFilter<"License"> | string
    licenseKey?: StringNullableWithAggregatesFilter<"License"> | string | null
    status?: StringWithAggregatesFilter<"License"> | string
    tier?: StringWithAggregatesFilter<"License"> | string
    trialStartedAt?: DateTimeWithAggregatesFilter<"License"> | Date | string
    activatedAt?: DateTimeNullableWithAggregatesFilter<"License"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"License"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"License"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: IntFilter<"ActivityLog"> | number
    userId?: IntNullableFilter<"ActivityLog"> | number | null
    action?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    userId?: IntNullableFilter<"ActivityLog"> | number | null
    action?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _avg?: ActivityLogAvgOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
    _sum?: ActivityLogSumOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ActivityLog"> | number
    userId?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    action?: StringWithAggregatesFilter<"ActivityLog"> | string
    details?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type ClinicSettingsCreateInput = {
    clinicName?: string
    tagline?: string | null
    address?: string
    phone?: string
    email?: string | null
    website?: string | null
    doctorName?: string | null
    doctorQualification?: string | null
    doctorRegNo?: string | null
    dlNumber?: string | null
    gstin?: string | null
    currencySymbol?: string
    footerNote?: string | null
    termsConditions?: string | null
    logo?: Buffer | null
    doctorSignature?: Buffer | null
    clinicStamp?: Buffer | null
    letterhead?: boolean
    printShowLogo?: boolean
    printShowSignature?: boolean
    printThermal?: boolean
    printPaperSize?: string
    printColor?: string
    licenseKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSettingsUncheckedCreateInput = {
    id?: number
    clinicName?: string
    tagline?: string | null
    address?: string
    phone?: string
    email?: string | null
    website?: string | null
    doctorName?: string | null
    doctorQualification?: string | null
    doctorRegNo?: string | null
    dlNumber?: string | null
    gstin?: string | null
    currencySymbol?: string
    footerNote?: string | null
    termsConditions?: string | null
    logo?: Buffer | null
    doctorSignature?: Buffer | null
    clinicStamp?: Buffer | null
    letterhead?: boolean
    printShowLogo?: boolean
    printShowSignature?: boolean
    printThermal?: boolean
    printPaperSize?: string
    printColor?: string
    licenseKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSettingsUpdateInput = {
    clinicName?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    doctorQualification?: NullableStringFieldUpdateOperationsInput | string | null
    doctorRegNo?: NullableStringFieldUpdateOperationsInput | string | null
    dlNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: StringFieldUpdateOperationsInput | string
    footerNote?: NullableStringFieldUpdateOperationsInput | string | null
    termsConditions?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    doctorSignature?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    clinicStamp?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    letterhead?: BoolFieldUpdateOperationsInput | boolean
    printShowLogo?: BoolFieldUpdateOperationsInput | boolean
    printShowSignature?: BoolFieldUpdateOperationsInput | boolean
    printThermal?: BoolFieldUpdateOperationsInput | boolean
    printPaperSize?: StringFieldUpdateOperationsInput | string
    printColor?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clinicName?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    doctorQualification?: NullableStringFieldUpdateOperationsInput | string | null
    doctorRegNo?: NullableStringFieldUpdateOperationsInput | string | null
    dlNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: StringFieldUpdateOperationsInput | string
    footerNote?: NullableStringFieldUpdateOperationsInput | string | null
    termsConditions?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    doctorSignature?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    clinicStamp?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    letterhead?: BoolFieldUpdateOperationsInput | boolean
    printShowLogo?: BoolFieldUpdateOperationsInput | boolean
    printShowSignature?: BoolFieldUpdateOperationsInput | boolean
    printThermal?: BoolFieldUpdateOperationsInput | boolean
    printPaperSize?: StringFieldUpdateOperationsInput | string
    printColor?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSettingsCreateManyInput = {
    id?: number
    clinicName?: string
    tagline?: string | null
    address?: string
    phone?: string
    email?: string | null
    website?: string | null
    doctorName?: string | null
    doctorQualification?: string | null
    doctorRegNo?: string | null
    dlNumber?: string | null
    gstin?: string | null
    currencySymbol?: string
    footerNote?: string | null
    termsConditions?: string | null
    logo?: Buffer | null
    doctorSignature?: Buffer | null
    clinicStamp?: Buffer | null
    letterhead?: boolean
    printShowLogo?: boolean
    printShowSignature?: boolean
    printThermal?: boolean
    printPaperSize?: string
    printColor?: string
    licenseKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSettingsUpdateManyMutationInput = {
    clinicName?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    doctorQualification?: NullableStringFieldUpdateOperationsInput | string | null
    doctorRegNo?: NullableStringFieldUpdateOperationsInput | string | null
    dlNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: StringFieldUpdateOperationsInput | string
    footerNote?: NullableStringFieldUpdateOperationsInput | string | null
    termsConditions?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    doctorSignature?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    clinicStamp?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    letterhead?: BoolFieldUpdateOperationsInput | boolean
    printShowLogo?: BoolFieldUpdateOperationsInput | boolean
    printShowSignature?: BoolFieldUpdateOperationsInput | boolean
    printThermal?: BoolFieldUpdateOperationsInput | boolean
    printPaperSize?: StringFieldUpdateOperationsInput | string
    printColor?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clinicName?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    doctorQualification?: NullableStringFieldUpdateOperationsInput | string | null
    doctorRegNo?: NullableStringFieldUpdateOperationsInput | string | null
    dlNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gstin?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: StringFieldUpdateOperationsInput | string
    footerNote?: NullableStringFieldUpdateOperationsInput | string | null
    termsConditions?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    doctorSignature?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    clinicStamp?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    letterhead?: BoolFieldUpdateOperationsInput | boolean
    printShowLogo?: BoolFieldUpdateOperationsInput | boolean
    printShowSignature?: BoolFieldUpdateOperationsInput | boolean
    printThermal?: BoolFieldUpdateOperationsInput | boolean
    printPaperSize?: StringFieldUpdateOperationsInput | string
    printColor?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patients?: PatientCreateNestedManyWithoutUserInput
    bills?: BillCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patients?: PatientUncheckedCreateNestedManyWithoutUserInput
    bills?: BillUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patients?: PatientUpdateManyWithoutUserNestedInput
    bills?: BillUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patients?: PatientUncheckedUpdateManyWithoutUserNestedInput
    bills?: BillUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatientCreateInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutPatientsInput
    bills?: BillCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    createdBy?: number | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutPatientsNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    createdBy?: number | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorCreateInput = {
    name: string
    qualification?: string | null
    specialization?: string | null
    hospital?: string | null
    mobile?: string | null
    email?: string | null
    consultationFee?: number
    commission?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUncheckedCreateInput = {
    id?: number
    name: string
    qualification?: string | null
    specialization?: string | null
    hospital?: string | null
    mobile?: string | null
    email?: string | null
    consultationFee?: number
    commission?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    hospital?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    hospital?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateManyInput = {
    id?: number
    name: string
    qualification?: string | null
    specialization?: string | null
    hospital?: string | null
    mobile?: string | null
    email?: string | null
    consultationFee?: number
    commission?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    hospital?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    hospital?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CatalogItemCreateInput = {
    code?: string | null
    name: string
    category: string
    defaultPrice: number
    costPrice?: number | null
    stock?: number | null
    unit?: string | null
    taxPercent?: number | null
    isCustom?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CatalogItemUncheckedCreateInput = {
    id?: number
    code?: string | null
    name: string
    category: string
    defaultPrice: number
    costPrice?: number | null
    stock?: number | null
    unit?: string | null
    taxPercent?: number | null
    isCustom?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CatalogItemUpdateInput = {
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    defaultPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    taxPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CatalogItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    defaultPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    taxPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CatalogItemCreateManyInput = {
    id?: number
    code?: string | null
    name: string
    category: string
    defaultPrice: number
    costPrice?: number | null
    stock?: number | null
    unit?: string | null
    taxPercent?: number | null
    isCustom?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CatalogItemUpdateManyMutationInput = {
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    defaultPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    taxPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CatalogItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    defaultPrice?: FloatFieldUpdateOperationsInput | number
    costPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    taxPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BillCreateInput = {
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutBillsInput
    user?: UserCreateNestedOneWithoutBillsInput
    items?: BillItemCreateNestedManyWithoutBillInput
    payments?: PaymentCreateNestedManyWithoutBillInput
  }

  export type BillUncheckedCreateInput = {
    id?: number
    billNo: string
    patientId: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BillItemUncheckedCreateNestedManyWithoutBillInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillUpdateInput = {
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutBillsNestedInput
    user?: UserUpdateOneWithoutBillsNestedInput
    items?: BillItemUpdateManyWithoutBillNestedInput
    payments?: PaymentUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BillItemUncheckedUpdateManyWithoutBillNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillCreateManyInput = {
    id?: number
    billNo: string
    patientId: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillUpdateManyMutationInput = {
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillItemCreateInput = {
    itemId?: number | null
    itemName: string
    itemCategory?: string
    quantity?: number
    unitPrice: number
    discount?: number
    total: number
    createdAt?: Date | string
    bill: BillCreateNestedOneWithoutItemsInput
  }

  export type BillItemUncheckedCreateInput = {
    id?: number
    billId: number
    itemId?: number | null
    itemName: string
    itemCategory?: string
    quantity?: number
    unitPrice: number
    discount?: number
    total: number
    createdAt?: Date | string
  }

  export type BillItemUpdateInput = {
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bill?: BillUpdateOneRequiredWithoutItemsNestedInput
  }

  export type BillItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    billId?: IntFieldUpdateOperationsInput | number
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillItemCreateManyInput = {
    id?: number
    billId: number
    itemId?: number | null
    itemName: string
    itemCategory?: string
    quantity?: number
    unitPrice: number
    discount?: number
    total: number
    createdAt?: Date | string
  }

  export type BillItemUpdateManyMutationInput = {
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    billId?: IntFieldUpdateOperationsInput | number
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    amount: number
    method?: string
    reference?: string | null
    receivedBy?: number | null
    paidAt?: Date | string
    bill: BillCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    billId: number
    amount: number
    method?: string
    reference?: string | null
    receivedBy?: number | null
    paidAt?: Date | string
  }

  export type PaymentUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bill?: BillUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    billId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    billId: number
    amount: number
    method?: string
    reference?: string | null
    receivedBy?: number | null
    paidAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    billId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseCreateInput = {
    machineId: string
    licenseKey?: string | null
    status?: string
    tier?: string
    trialStartedAt?: Date | string
    activatedAt?: Date | string | null
    expiresAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type LicenseUncheckedCreateInput = {
    id?: number
    machineId: string
    licenseKey?: string | null
    status?: string
    tier?: string
    trialStartedAt?: Date | string
    activatedAt?: Date | string | null
    expiresAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type LicenseUpdateInput = {
    machineId?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseCreateManyInput = {
    id?: number
    machineId: string
    licenseKey?: string | null
    status?: string
    tier?: string
    trialStartedAt?: Date | string
    activatedAt?: Date | string | null
    expiresAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type LicenseUpdateManyMutationInput = {
    machineId?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: StringFieldUpdateOperationsInput | string
    licenseKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    action: string
    details?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: number
    userId?: number | null
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: number
    userId?: number | null
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel> | null
    in?: Buffer[] | null
    notIn?: Buffer[] | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Buffer | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClinicSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    clinicName?: SortOrder
    tagline?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    doctorName?: SortOrder
    doctorQualification?: SortOrder
    doctorRegNo?: SortOrder
    dlNumber?: SortOrder
    gstin?: SortOrder
    currencySymbol?: SortOrder
    footerNote?: SortOrder
    termsConditions?: SortOrder
    logo?: SortOrder
    doctorSignature?: SortOrder
    clinicStamp?: SortOrder
    letterhead?: SortOrder
    printShowLogo?: SortOrder
    printShowSignature?: SortOrder
    printThermal?: SortOrder
    printPaperSize?: SortOrder
    printColor?: SortOrder
    licenseKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClinicSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    clinicName?: SortOrder
    tagline?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    doctorName?: SortOrder
    doctorQualification?: SortOrder
    doctorRegNo?: SortOrder
    dlNumber?: SortOrder
    gstin?: SortOrder
    currencySymbol?: SortOrder
    footerNote?: SortOrder
    termsConditions?: SortOrder
    logo?: SortOrder
    doctorSignature?: SortOrder
    clinicStamp?: SortOrder
    letterhead?: SortOrder
    printShowLogo?: SortOrder
    printShowSignature?: SortOrder
    printThermal?: SortOrder
    printPaperSize?: SortOrder
    printColor?: SortOrder
    licenseKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    clinicName?: SortOrder
    tagline?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    doctorName?: SortOrder
    doctorQualification?: SortOrder
    doctorRegNo?: SortOrder
    dlNumber?: SortOrder
    gstin?: SortOrder
    currencySymbol?: SortOrder
    footerNote?: SortOrder
    termsConditions?: SortOrder
    logo?: SortOrder
    doctorSignature?: SortOrder
    clinicStamp?: SortOrder
    letterhead?: SortOrder
    printShowLogo?: SortOrder
    printShowSignature?: SortOrder
    printThermal?: SortOrder
    printPaperSize?: SortOrder
    printColor?: SortOrder
    licenseKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSettingsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel> | null
    in?: Buffer[] | null
    notIn?: Buffer[] | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Buffer | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PatientListRelationFilter = {
    every?: PatientWhereInput
    some?: PatientWhereInput
    none?: PatientWhereInput
  }

  export type BillListRelationFilter = {
    every?: BillWhereInput
    some?: BillWhereInput
    none?: BillWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type PatientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    recoveryHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    recoveryHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    recoveryHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    uhid?: SortOrder
    name?: SortOrder
    age?: SortOrder
    ageUnit?: SortOrder
    gender?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    address?: SortOrder
    bloodGroup?: SortOrder
    emergencyContact?: SortOrder
    referredDoctor?: SortOrder
    createdBy?: SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    age?: SortOrder
    createdBy?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    uhid?: SortOrder
    name?: SortOrder
    age?: SortOrder
    ageUnit?: SortOrder
    gender?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    address?: SortOrder
    bloodGroup?: SortOrder
    emergencyContact?: SortOrder
    referredDoctor?: SortOrder
    createdBy?: SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    uhid?: SortOrder
    name?: SortOrder
    age?: SortOrder
    ageUnit?: SortOrder
    gender?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    address?: SortOrder
    bloodGroup?: SortOrder
    emergencyContact?: SortOrder
    referredDoctor?: SortOrder
    createdBy?: SortOrder
    registeredAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    age?: SortOrder
    createdBy?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DoctorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    specialization?: SortOrder
    hospital?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorAvgOrderByAggregateInput = {
    id?: SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    specialization?: SortOrder
    hospital?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    specialization?: SortOrder
    hospital?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorSumOrderByAggregateInput = {
    id?: SortOrder
    consultationFee?: SortOrder
    commission?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CatalogItemCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    unit?: SortOrder
    taxPercent?: SortOrder
    isCustom?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type CatalogItemAvgOrderByAggregateInput = {
    id?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    taxPercent?: SortOrder
  }

  export type CatalogItemMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    unit?: SortOrder
    taxPercent?: SortOrder
    isCustom?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type CatalogItemMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    unit?: SortOrder
    taxPercent?: SortOrder
    isCustom?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type CatalogItemSumOrderByAggregateInput = {
    id?: SortOrder
    defaultPrice?: SortOrder
    costPrice?: SortOrder
    stock?: SortOrder
    taxPercent?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PatientRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type BillItemListRelationFilter = {
    every?: BillItemWhereInput
    some?: BillItemWhereInput
    none?: BillItemWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type BillItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillCountOrderByAggregateInput = {
    id?: SortOrder
    billNo?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientGender?: SortOrder
    patientMobile?: SortOrder
    doctorName?: SortOrder
    subtotal?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrder
    clinicSnapshot?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillAvgOrderByAggregateInput = {
    id?: SortOrder
    patientAge?: SortOrder
    subtotal?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    createdBy?: SortOrder
  }

  export type BillMaxOrderByAggregateInput = {
    id?: SortOrder
    billNo?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientGender?: SortOrder
    patientMobile?: SortOrder
    doctorName?: SortOrder
    subtotal?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrder
    clinicSnapshot?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillMinOrderByAggregateInput = {
    id?: SortOrder
    billNo?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientAge?: SortOrder
    patientGender?: SortOrder
    patientMobile?: SortOrder
    doctorName?: SortOrder
    subtotal?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrder
    clinicSnapshot?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillSumOrderByAggregateInput = {
    id?: SortOrder
    patientAge?: SortOrder
    subtotal?: SortOrder
    discountValue?: SortOrder
    discountAmount?: SortOrder
    gstPercent?: SortOrder
    gstAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    dueAmount?: SortOrder
    createdBy?: SortOrder
  }

  export type BillRelationFilter = {
    is?: BillWhereInput
    isNot?: BillWhereInput
  }

  export type BillItemCountOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrder
    itemName?: SortOrder
    itemCategory?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type BillItemAvgOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
  }

  export type BillItemMaxOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrder
    itemName?: SortOrder
    itemCategory?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type BillItemMinOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrder
    itemName?: SortOrder
    itemCategory?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
  }

  export type BillItemSumOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    discount?: SortOrder
    total?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    reference?: SortOrder
    receivedBy?: SortOrder
    paidAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    receivedBy?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    reference?: SortOrder
    receivedBy?: SortOrder
    paidAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    reference?: SortOrder
    receivedBy?: SortOrder
    paidAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amount?: SortOrder
    receivedBy?: SortOrder
  }

  export type LicenseCountOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    licenseKey?: SortOrder
    status?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    activatedAt?: SortOrder
    expiresAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LicenseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LicenseMaxOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    licenseKey?: SortOrder
    status?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    activatedAt?: SortOrder
    expiresAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LicenseMinOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    licenseKey?: SortOrder
    status?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    activatedAt?: SortOrder
    expiresAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LicenseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Buffer | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientCreateNestedManyWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput> | PatientCreateWithoutUserInput[] | PatientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput | PatientCreateOrConnectWithoutUserInput[]
    createMany?: PatientCreateManyUserInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutUserInput = {
    create?: XOR<BillCreateWithoutUserInput, BillUncheckedCreateWithoutUserInput> | BillCreateWithoutUserInput[] | BillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillCreateOrConnectWithoutUserInput | BillCreateOrConnectWithoutUserInput[]
    createMany?: BillCreateManyUserInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type PatientUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput> | PatientCreateWithoutUserInput[] | PatientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput | PatientCreateOrConnectWithoutUserInput[]
    createMany?: PatientCreateManyUserInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BillCreateWithoutUserInput, BillUncheckedCreateWithoutUserInput> | BillCreateWithoutUserInput[] | BillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillCreateOrConnectWithoutUserInput | BillCreateOrConnectWithoutUserInput[]
    createMany?: BillCreateManyUserInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PatientUpdateManyWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput> | PatientCreateWithoutUserInput[] | PatientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput | PatientCreateOrConnectWithoutUserInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutUserInput | PatientUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PatientCreateManyUserInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutUserInput | PatientUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutUserInput | PatientUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type BillUpdateManyWithoutUserNestedInput = {
    create?: XOR<BillCreateWithoutUserInput, BillUncheckedCreateWithoutUserInput> | BillCreateWithoutUserInput[] | BillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillCreateOrConnectWithoutUserInput | BillCreateOrConnectWithoutUserInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutUserInput | BillUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BillCreateManyUserInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutUserInput | BillUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BillUpdateManyWithWhereWithoutUserInput | BillUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type PatientUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput> | PatientCreateWithoutUserInput[] | PatientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput | PatientCreateOrConnectWithoutUserInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutUserInput | PatientUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PatientCreateManyUserInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutUserInput | PatientUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutUserInput | PatientUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BillCreateWithoutUserInput, BillUncheckedCreateWithoutUserInput> | BillCreateWithoutUserInput[] | BillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillCreateOrConnectWithoutUserInput | BillCreateOrConnectWithoutUserInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutUserInput | BillUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BillCreateManyUserInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutUserInput | BillUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BillUpdateManyWithWhereWithoutUserInput | BillUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPatientsInput = {
    create?: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientsInput
    connect?: UserWhereUniqueInput
  }

  export type BillCreateNestedManyWithoutPatientInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutPatientsNestedInput = {
    create?: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientsInput
    upsert?: UserUpsertWithoutPatientsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientsInput, UserUpdateWithoutPatientsInput>, UserUncheckedUpdateWithoutPatientsInput>
  }

  export type BillUpdateManyWithoutPatientNestedInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutPatientInput | BillUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutPatientInput | BillUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: BillUpdateManyWithWhereWithoutPatientInput | BillUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BillUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutPatientInput | BillUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutPatientInput | BillUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: BillUpdateManyWithWhereWithoutPatientInput | BillUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientCreateNestedOneWithoutBillsInput = {
    create?: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutBillsInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBillsInput = {
    create?: XOR<UserCreateWithoutBillsInput, UserUncheckedCreateWithoutBillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillsInput
    connect?: UserWhereUniqueInput
  }

  export type BillItemCreateNestedManyWithoutBillInput = {
    create?: XOR<BillItemCreateWithoutBillInput, BillItemUncheckedCreateWithoutBillInput> | BillItemCreateWithoutBillInput[] | BillItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillItemCreateOrConnectWithoutBillInput | BillItemCreateOrConnectWithoutBillInput[]
    createMany?: BillItemCreateManyBillInputEnvelope
    connect?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutBillInput = {
    create?: XOR<PaymentCreateWithoutBillInput, PaymentUncheckedCreateWithoutBillInput> | PaymentCreateWithoutBillInput[] | PaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBillInput | PaymentCreateOrConnectWithoutBillInput[]
    createMany?: PaymentCreateManyBillInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type BillItemUncheckedCreateNestedManyWithoutBillInput = {
    create?: XOR<BillItemCreateWithoutBillInput, BillItemUncheckedCreateWithoutBillInput> | BillItemCreateWithoutBillInput[] | BillItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillItemCreateOrConnectWithoutBillInput | BillItemCreateOrConnectWithoutBillInput[]
    createMany?: BillItemCreateManyBillInputEnvelope
    connect?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutBillInput = {
    create?: XOR<PaymentCreateWithoutBillInput, PaymentUncheckedCreateWithoutBillInput> | PaymentCreateWithoutBillInput[] | PaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBillInput | PaymentCreateOrConnectWithoutBillInput[]
    createMany?: PaymentCreateManyBillInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PatientUpdateOneRequiredWithoutBillsNestedInput = {
    create?: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutBillsInput
    upsert?: PatientUpsertWithoutBillsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutBillsInput, PatientUpdateWithoutBillsInput>, PatientUncheckedUpdateWithoutBillsInput>
  }

  export type UserUpdateOneWithoutBillsNestedInput = {
    create?: XOR<UserCreateWithoutBillsInput, UserUncheckedCreateWithoutBillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillsInput
    upsert?: UserUpsertWithoutBillsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBillsInput, UserUpdateWithoutBillsInput>, UserUncheckedUpdateWithoutBillsInput>
  }

  export type BillItemUpdateManyWithoutBillNestedInput = {
    create?: XOR<BillItemCreateWithoutBillInput, BillItemUncheckedCreateWithoutBillInput> | BillItemCreateWithoutBillInput[] | BillItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillItemCreateOrConnectWithoutBillInput | BillItemCreateOrConnectWithoutBillInput[]
    upsert?: BillItemUpsertWithWhereUniqueWithoutBillInput | BillItemUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: BillItemCreateManyBillInputEnvelope
    set?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    disconnect?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    delete?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    connect?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    update?: BillItemUpdateWithWhereUniqueWithoutBillInput | BillItemUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: BillItemUpdateManyWithWhereWithoutBillInput | BillItemUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: BillItemScalarWhereInput | BillItemScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutBillNestedInput = {
    create?: XOR<PaymentCreateWithoutBillInput, PaymentUncheckedCreateWithoutBillInput> | PaymentCreateWithoutBillInput[] | PaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBillInput | PaymentCreateOrConnectWithoutBillInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutBillInput | PaymentUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: PaymentCreateManyBillInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutBillInput | PaymentUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutBillInput | PaymentUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type BillItemUncheckedUpdateManyWithoutBillNestedInput = {
    create?: XOR<BillItemCreateWithoutBillInput, BillItemUncheckedCreateWithoutBillInput> | BillItemCreateWithoutBillInput[] | BillItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillItemCreateOrConnectWithoutBillInput | BillItemCreateOrConnectWithoutBillInput[]
    upsert?: BillItemUpsertWithWhereUniqueWithoutBillInput | BillItemUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: BillItemCreateManyBillInputEnvelope
    set?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    disconnect?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    delete?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    connect?: BillItemWhereUniqueInput | BillItemWhereUniqueInput[]
    update?: BillItemUpdateWithWhereUniqueWithoutBillInput | BillItemUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: BillItemUpdateManyWithWhereWithoutBillInput | BillItemUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: BillItemScalarWhereInput | BillItemScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutBillNestedInput = {
    create?: XOR<PaymentCreateWithoutBillInput, PaymentUncheckedCreateWithoutBillInput> | PaymentCreateWithoutBillInput[] | PaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBillInput | PaymentCreateOrConnectWithoutBillInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutBillInput | PaymentUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: PaymentCreateManyBillInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutBillInput | PaymentUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutBillInput | PaymentUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type BillCreateNestedOneWithoutItemsInput = {
    create?: XOR<BillCreateWithoutItemsInput, BillUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BillCreateOrConnectWithoutItemsInput
    connect?: BillWhereUniqueInput
  }

  export type BillUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<BillCreateWithoutItemsInput, BillUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BillCreateOrConnectWithoutItemsInput
    upsert?: BillUpsertWithoutItemsInput
    connect?: BillWhereUniqueInput
    update?: XOR<XOR<BillUpdateToOneWithWhereWithoutItemsInput, BillUpdateWithoutItemsInput>, BillUncheckedUpdateWithoutItemsInput>
  }

  export type BillCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<BillCreateWithoutPaymentsInput, BillUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BillCreateOrConnectWithoutPaymentsInput
    connect?: BillWhereUniqueInput
  }

  export type BillUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<BillCreateWithoutPaymentsInput, BillUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BillCreateOrConnectWithoutPaymentsInput
    upsert?: BillUpsertWithoutPaymentsInput
    connect?: BillWhereUniqueInput
    update?: XOR<XOR<BillUpdateToOneWithWhereWithoutPaymentsInput, BillUpdateWithoutPaymentsInput>, BillUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutActivityLogsNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    upsert?: UserUpsertWithoutActivityLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogsInput, UserUpdateWithoutActivityLogsInput>, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel> | null
    in?: Buffer[] | null
    notIn?: Buffer[] | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Buffer | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel> | null
    in?: Buffer[] | null
    notIn?: Buffer[] | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Buffer | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PatientCreateWithoutUserInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    bills?: BillCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutUserInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutUserInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
  }

  export type PatientCreateManyUserInputEnvelope = {
    data: PatientCreateManyUserInput | PatientCreateManyUserInput[]
  }

  export type BillCreateWithoutUserInput = {
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutBillsInput
    items?: BillItemCreateNestedManyWithoutBillInput
    payments?: PaymentCreateNestedManyWithoutBillInput
  }

  export type BillUncheckedCreateWithoutUserInput = {
    id?: number
    billNo: string
    patientId: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BillItemUncheckedCreateNestedManyWithoutBillInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutUserInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutUserInput, BillUncheckedCreateWithoutUserInput>
  }

  export type BillCreateManyUserInputEnvelope = {
    data: BillCreateManyUserInput | BillCreateManyUserInput[]
  }

  export type ActivityLogCreateWithoutUserInput = {
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: number
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
  }

  export type PatientUpsertWithWhereUniqueWithoutUserInput = {
    where: PatientWhereUniqueInput
    update: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
  }

  export type PatientUpdateWithWhereUniqueWithoutUserInput = {
    where: PatientWhereUniqueInput
    data: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateManyWithWhereWithoutUserInput = {
    where: PatientScalarWhereInput
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyWithoutUserInput>
  }

  export type PatientScalarWhereInput = {
    AND?: PatientScalarWhereInput | PatientScalarWhereInput[]
    OR?: PatientScalarWhereInput[]
    NOT?: PatientScalarWhereInput | PatientScalarWhereInput[]
    id?: StringFilter<"Patient"> | string
    uhid?: StringNullableFilter<"Patient"> | string | null
    name?: StringFilter<"Patient"> | string
    age?: IntFilter<"Patient"> | number
    ageUnit?: StringFilter<"Patient"> | string
    gender?: StringFilter<"Patient"> | string
    mobile?: StringFilter<"Patient"> | string
    email?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    emergencyContact?: StringNullableFilter<"Patient"> | string | null
    referredDoctor?: StringNullableFilter<"Patient"> | string | null
    createdBy?: IntNullableFilter<"Patient"> | number | null
    registeredAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
  }

  export type BillUpsertWithWhereUniqueWithoutUserInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutUserInput, BillUncheckedUpdateWithoutUserInput>
    create: XOR<BillCreateWithoutUserInput, BillUncheckedCreateWithoutUserInput>
  }

  export type BillUpdateWithWhereUniqueWithoutUserInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutUserInput, BillUncheckedUpdateWithoutUserInput>
  }

  export type BillUpdateManyWithWhereWithoutUserInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutUserInput>
  }

  export type BillScalarWhereInput = {
    AND?: BillScalarWhereInput | BillScalarWhereInput[]
    OR?: BillScalarWhereInput[]
    NOT?: BillScalarWhereInput | BillScalarWhereInput[]
    id?: IntFilter<"Bill"> | number
    billNo?: StringFilter<"Bill"> | string
    patientId?: StringFilter<"Bill"> | string
    patientName?: StringFilter<"Bill"> | string
    patientAge?: IntNullableFilter<"Bill"> | number | null
    patientGender?: StringNullableFilter<"Bill"> | string | null
    patientMobile?: StringNullableFilter<"Bill"> | string | null
    doctorName?: StringNullableFilter<"Bill"> | string | null
    subtotal?: FloatFilter<"Bill"> | number
    discountType?: StringFilter<"Bill"> | string
    discountValue?: FloatFilter<"Bill"> | number
    discountAmount?: FloatFilter<"Bill"> | number
    gstPercent?: FloatFilter<"Bill"> | number
    gstAmount?: FloatFilter<"Bill"> | number
    totalAmount?: FloatFilter<"Bill"> | number
    paidAmount?: FloatFilter<"Bill"> | number
    dueAmount?: FloatFilter<"Bill"> | number
    paymentMethod?: StringFilter<"Bill"> | string
    paymentStatus?: StringFilter<"Bill"> | string
    notes?: StringNullableFilter<"Bill"> | string | null
    clinicSnapshot?: StringNullableFilter<"Bill"> | string | null
    createdBy?: IntNullableFilter<"Bill"> | number | null
    createdAt?: DateTimeFilter<"Bill"> | Date | string
    updatedAt?: DateTimeFilter<"Bill"> | Date | string
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: IntFilter<"ActivityLog"> | number
    userId?: IntNullableFilter<"ActivityLog"> | number | null
    action?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type UserCreateWithoutPatientsInput = {
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    bills?: BillCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPatientsInput = {
    id?: number
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    bills?: BillUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPatientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
  }

  export type BillCreateWithoutPatientInput = {
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutBillsInput
    items?: BillItemCreateNestedManyWithoutBillInput
    payments?: PaymentCreateNestedManyWithoutBillInput
  }

  export type BillUncheckedCreateWithoutPatientInput = {
    id?: number
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BillItemUncheckedCreateNestedManyWithoutBillInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutPatientInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput>
  }

  export type BillCreateManyPatientInputEnvelope = {
    data: BillCreateManyPatientInput | BillCreateManyPatientInput[]
  }

  export type UserUpsertWithoutPatientsInput = {
    update: XOR<UserUpdateWithoutPatientsInput, UserUncheckedUpdateWithoutPatientsInput>
    create: XOR<UserCreateWithoutPatientsInput, UserUncheckedCreateWithoutPatientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientsInput, UserUncheckedUpdateWithoutPatientsInput>
  }

  export type UserUpdateWithoutPatientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bills?: BillUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bills?: BillUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BillUpsertWithWhereUniqueWithoutPatientInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutPatientInput, BillUncheckedUpdateWithoutPatientInput>
    create: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput>
  }

  export type BillUpdateWithWhereUniqueWithoutPatientInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutPatientInput, BillUncheckedUpdateWithoutPatientInput>
  }

  export type BillUpdateManyWithWhereWithoutPatientInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientCreateWithoutBillsInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutPatientsInput
  }

  export type PatientUncheckedCreateWithoutBillsInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    createdBy?: number | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PatientCreateOrConnectWithoutBillsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
  }

  export type UserCreateWithoutBillsInput = {
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patients?: PatientCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBillsInput = {
    id?: number
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patients?: PatientUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBillsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBillsInput, UserUncheckedCreateWithoutBillsInput>
  }

  export type BillItemCreateWithoutBillInput = {
    itemId?: number | null
    itemName: string
    itemCategory?: string
    quantity?: number
    unitPrice: number
    discount?: number
    total: number
    createdAt?: Date | string
  }

  export type BillItemUncheckedCreateWithoutBillInput = {
    id?: number
    itemId?: number | null
    itemName: string
    itemCategory?: string
    quantity?: number
    unitPrice: number
    discount?: number
    total: number
    createdAt?: Date | string
  }

  export type BillItemCreateOrConnectWithoutBillInput = {
    where: BillItemWhereUniqueInput
    create: XOR<BillItemCreateWithoutBillInput, BillItemUncheckedCreateWithoutBillInput>
  }

  export type BillItemCreateManyBillInputEnvelope = {
    data: BillItemCreateManyBillInput | BillItemCreateManyBillInput[]
  }

  export type PaymentCreateWithoutBillInput = {
    amount: number
    method?: string
    reference?: string | null
    receivedBy?: number | null
    paidAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutBillInput = {
    id?: number
    amount: number
    method?: string
    reference?: string | null
    receivedBy?: number | null
    paidAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutBillInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutBillInput, PaymentUncheckedCreateWithoutBillInput>
  }

  export type PaymentCreateManyBillInputEnvelope = {
    data: PaymentCreateManyBillInput | PaymentCreateManyBillInput[]
  }

  export type PatientUpsertWithoutBillsInput = {
    update: XOR<PatientUpdateWithoutBillsInput, PatientUncheckedUpdateWithoutBillsInput>
    create: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutBillsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutBillsInput, PatientUncheckedUpdateWithoutBillsInput>
  }

  export type PatientUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutPatientsNestedInput
  }

  export type PatientUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutBillsInput = {
    update: XOR<UserUpdateWithoutBillsInput, UserUncheckedUpdateWithoutBillsInput>
    create: XOR<UserCreateWithoutBillsInput, UserUncheckedCreateWithoutBillsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBillsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBillsInput, UserUncheckedUpdateWithoutBillsInput>
  }

  export type UserUpdateWithoutBillsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patients?: PatientUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patients?: PatientUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BillItemUpsertWithWhereUniqueWithoutBillInput = {
    where: BillItemWhereUniqueInput
    update: XOR<BillItemUpdateWithoutBillInput, BillItemUncheckedUpdateWithoutBillInput>
    create: XOR<BillItemCreateWithoutBillInput, BillItemUncheckedCreateWithoutBillInput>
  }

  export type BillItemUpdateWithWhereUniqueWithoutBillInput = {
    where: BillItemWhereUniqueInput
    data: XOR<BillItemUpdateWithoutBillInput, BillItemUncheckedUpdateWithoutBillInput>
  }

  export type BillItemUpdateManyWithWhereWithoutBillInput = {
    where: BillItemScalarWhereInput
    data: XOR<BillItemUpdateManyMutationInput, BillItemUncheckedUpdateManyWithoutBillInput>
  }

  export type BillItemScalarWhereInput = {
    AND?: BillItemScalarWhereInput | BillItemScalarWhereInput[]
    OR?: BillItemScalarWhereInput[]
    NOT?: BillItemScalarWhereInput | BillItemScalarWhereInput[]
    id?: IntFilter<"BillItem"> | number
    billId?: IntFilter<"BillItem"> | number
    itemId?: IntNullableFilter<"BillItem"> | number | null
    itemName?: StringFilter<"BillItem"> | string
    itemCategory?: StringFilter<"BillItem"> | string
    quantity?: IntFilter<"BillItem"> | number
    unitPrice?: FloatFilter<"BillItem"> | number
    discount?: FloatFilter<"BillItem"> | number
    total?: FloatFilter<"BillItem"> | number
    createdAt?: DateTimeFilter<"BillItem"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutBillInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutBillInput, PaymentUncheckedUpdateWithoutBillInput>
    create: XOR<PaymentCreateWithoutBillInput, PaymentUncheckedCreateWithoutBillInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutBillInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutBillInput, PaymentUncheckedUpdateWithoutBillInput>
  }

  export type PaymentUpdateManyWithWhereWithoutBillInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutBillInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    billId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    method?: StringFilter<"Payment"> | string
    reference?: StringNullableFilter<"Payment"> | string | null
    receivedBy?: IntNullableFilter<"Payment"> | number | null
    paidAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type BillCreateWithoutItemsInput = {
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutBillsInput
    user?: UserCreateNestedOneWithoutBillsInput
    payments?: PaymentCreateNestedManyWithoutBillInput
  }

  export type BillUncheckedCreateWithoutItemsInput = {
    id?: number
    billNo: string
    patientId: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutItemsInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutItemsInput, BillUncheckedCreateWithoutItemsInput>
  }

  export type BillUpsertWithoutItemsInput = {
    update: XOR<BillUpdateWithoutItemsInput, BillUncheckedUpdateWithoutItemsInput>
    create: XOR<BillCreateWithoutItemsInput, BillUncheckedCreateWithoutItemsInput>
    where?: BillWhereInput
  }

  export type BillUpdateToOneWithWhereWithoutItemsInput = {
    where?: BillWhereInput
    data: XOR<BillUpdateWithoutItemsInput, BillUncheckedUpdateWithoutItemsInput>
  }

  export type BillUpdateWithoutItemsInput = {
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutBillsNestedInput
    user?: UserUpdateOneWithoutBillsNestedInput
    payments?: PaymentUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillCreateWithoutPaymentsInput = {
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutBillsInput
    user?: UserCreateNestedOneWithoutBillsInput
    items?: BillItemCreateNestedManyWithoutBillInput
  }

  export type BillUncheckedCreateWithoutPaymentsInput = {
    id?: number
    billNo: string
    patientId: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BillItemUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutPaymentsInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutPaymentsInput, BillUncheckedCreateWithoutPaymentsInput>
  }

  export type BillUpsertWithoutPaymentsInput = {
    update: XOR<BillUpdateWithoutPaymentsInput, BillUncheckedUpdateWithoutPaymentsInput>
    create: XOR<BillCreateWithoutPaymentsInput, BillUncheckedCreateWithoutPaymentsInput>
    where?: BillWhereInput
  }

  export type BillUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: BillWhereInput
    data: XOR<BillUpdateWithoutPaymentsInput, BillUncheckedUpdateWithoutPaymentsInput>
  }

  export type BillUpdateWithoutPaymentsInput = {
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutBillsNestedInput
    user?: UserUpdateOneWithoutBillsNestedInput
    items?: BillItemUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BillItemUncheckedUpdateManyWithoutBillNestedInput
  }

  export type UserCreateWithoutActivityLogsInput = {
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patients?: PatientCreateNestedManyWithoutUserInput
    bills?: BillCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityLogsInput = {
    id?: number
    name: string
    email: string
    password: string
    recoveryHash?: string | null
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    avatar?: Buffer | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patients?: PatientUncheckedCreateNestedManyWithoutUserInput
    bills?: BillUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
  }

  export type UserUpsertWithoutActivityLogsInput = {
    update: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateWithoutActivityLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patients?: PatientUpdateManyWithoutUserNestedInput
    bills?: BillUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    recoveryHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: NullableBytesFieldUpdateOperationsInput | Buffer | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patients?: PatientUncheckedUpdateManyWithoutUserNestedInput
    bills?: BillUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PatientCreateManyUserInput = {
    id: string
    uhid?: string | null
    name: string
    age: number
    ageUnit?: string
    gender: string
    mobile: string
    email?: string | null
    address?: string | null
    bloodGroup?: string | null
    emergencyContact?: string | null
    referredDoctor?: string | null
    registeredAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type BillCreateManyUserInput = {
    id?: number
    billNo: string
    patientId: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityLogCreateManyUserInput = {
    id?: number
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type PatientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bills?: BillUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    uhid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    ageUnit?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    referredDoctor?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BillUpdateWithoutUserInput = {
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutBillsNestedInput
    items?: BillItemUpdateManyWithoutBillNestedInput
    payments?: PaymentUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BillItemUncheckedUpdateManyWithoutBillNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUpdateWithoutUserInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillCreateManyPatientInput = {
    id?: number
    billNo: string
    patientName: string
    patientAge?: number | null
    patientGender?: string | null
    patientMobile?: string | null
    doctorName?: string | null
    subtotal: number
    discountType?: string
    discountValue?: number
    discountAmount?: number
    gstPercent?: number
    gstAmount?: number
    totalAmount: number
    paidAmount?: number
    dueAmount?: number
    paymentMethod?: string
    paymentStatus?: string
    notes?: string | null
    clinicSnapshot?: string | null
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillUpdateWithoutPatientInput = {
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBillsNestedInput
    items?: BillItemUpdateManyWithoutBillNestedInput
    payments?: PaymentUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BillItemUncheckedUpdateManyWithoutBillNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNo?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientAge?: NullableIntFieldUpdateOperationsInput | number | null
    patientGender?: NullableStringFieldUpdateOperationsInput | string | null
    patientMobile?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    gstPercent?: FloatFieldUpdateOperationsInput | number
    gstAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    dueAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    clinicSnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillItemCreateManyBillInput = {
    id?: number
    itemId?: number | null
    itemName: string
    itemCategory?: string
    quantity?: number
    unitPrice: number
    discount?: number
    total: number
    createdAt?: Date | string
  }

  export type PaymentCreateManyBillInput = {
    id?: number
    amount: number
    method?: string
    reference?: string | null
    receivedBy?: number | null
    paidAt?: Date | string
  }

  export type BillItemUpdateWithoutBillInput = {
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillItemUncheckedUpdateWithoutBillInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillItemUncheckedUpdateManyWithoutBillInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: NullableIntFieldUpdateOperationsInput | number | null
    itemName?: StringFieldUpdateOperationsInput | string
    itemCategory?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutBillInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutBillInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutBillInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    receivedBy?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientCountOutputTypeDefaultArgs instead
     */
    export type PatientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillCountOutputTypeDefaultArgs instead
     */
    export type BillCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClinicSettingsDefaultArgs instead
     */
    export type ClinicSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClinicSettingsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientDefaultArgs instead
     */
    export type PatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DoctorDefaultArgs instead
     */
    export type DoctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DoctorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CatalogItemDefaultArgs instead
     */
    export type CatalogItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CatalogItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillDefaultArgs instead
     */
    export type BillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillItemDefaultArgs instead
     */
    export type BillItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LicenseDefaultArgs instead
     */
    export type LicenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LicenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivityLogDefaultArgs instead
     */
    export type ActivityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivityLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}