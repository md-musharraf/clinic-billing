import fs from 'fs';
import path from 'path';
import { PrismaClient } from '../../../prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const api = require('../../../lib/server-api');

export const dynamic = 'force-dynamic';

const g = globalThis as unknown as { medbilling?: { ctx: any; ready: Promise<void> } };
if (!g.medbilling) {
  const prisma = new PrismaClient();
  const schemaPath = path.join(process.cwd(), 'prisma', 'schema.sql');
  const sql = fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, 'utf8') : '';
  const ready = api.ensureSchema(prisma, sql).then(() => api.seedDefaults(prisma));
  g.medbilling = { ctx: { prisma, dataDir: process.cwd(), session: null }, ready };
}
const { ctx, ready } = g.medbilling;

export async function GET(req: Request) {
  await ready;
  return api.handleRequest(ctx, req);
}

export const POST = GET;
