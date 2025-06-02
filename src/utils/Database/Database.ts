import prisma from "../../lib/prisma"
import {   PrismaCompanyInterface, PrismaGeneric, PrismaWorkerInterface } from "./Prisma/PrismaDatabase";
import { Prisma } from "@prisma/client";

class DatabaseClass {
  constructor( 
    // public user: MongooseGeneric<UserDocument>,
    public company: PrismaGeneric<Prisma.CompanyCreateInput, PrismaCompanyInterface<Prisma.CompanyCreateInput>>,
    public worker: PrismaGeneric<Prisma.WorkerCreateInput, PrismaWorkerInterface<Prisma.WorkerCreateInput>>
  ) {
   
  }
}
export function createDatabase( ):DatabaseClass{
  // const userRepositiory = new MongooseGeneric<UserDocument>(UserModel);
  const companyRepositiory = new PrismaGeneric<Prisma.CompanyCreateInput, PrismaCompanyInterface<Prisma.CompanyCreateInput>>(prisma.company);
  const workerRepositiory = new PrismaGeneric<Prisma.WorkerCreateInput, PrismaWorkerInterface<Prisma.WorkerCreateInput> >(prisma.worker);
  return new DatabaseClass(companyRepositiory, workerRepositiory );
}

const Database = createDatabase();
export default Database;