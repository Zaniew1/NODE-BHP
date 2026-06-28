import { NODE_ENV, DATABASE_URL } from './../utils/constants/env';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrisma(): PrismaClient {
  let adapter = null;
  if (NODE_ENV === 'prod') {
    adapter = new PrismaPg({ connectionString: DATABASE_URL });
  } else {
    adapter = new PrismaLibSql({ url: DATABASE_URL });
  }
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrisma();

if (NODE_ENV !== 'prod') globalForPrisma.prisma = prisma;

export default prisma;
