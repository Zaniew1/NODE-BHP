import { NODE_ENV } from './../utils/constants/env';
import {PrismaClient} from "@prisma/client";
const globalForPrisma = global as unknown as {prisma : PrismaClient}

export const prisma = globalForPrisma.prisma || new PrismaClient();

if(NODE_ENV !== "prod") globalForPrisma.prisma = prisma;

export default prisma;