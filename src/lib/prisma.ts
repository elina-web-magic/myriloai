import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const connectionString = process.env.DATABASE_URL
	// Replace ambiguous sslmode aliases with the explicit 'verify-full' to silence
	// the pg-connection-string v3 deprecation warning. Behaviour is identical.
	?.replace('sslmode=require', 'sslmode=verify-full')
	?.replace('sslmode=prefer', 'sslmode=verify-full')
	?.replace('sslmode=verify-ca', 'sslmode=verify-full');
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: true } });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
