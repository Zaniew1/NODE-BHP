import {  Worker, Company } from "../types/types";
import prisma from "../../lib/prisma"
import {  CompanyPrismaInterface, PrismaGeneric } from "./Prisma/PrismaDatabase";
import { Prisma } from "@prisma/client";

class DatabaseClass {
  constructor( 
    // public user: MongooseGeneric<UserDocument>,
    public company: PrismaGeneric<Company, typeof prisma.company>
    // public worker: PrismaGeneric<Worker>
  ) {
   
  }
}
export function createDatabase( ):DatabaseClass{
  // const userRepositiory = new MongooseGeneric<UserDocument>(UserModel);
  const companyRepositiory = new PrismaGeneric<Company, typeof prisma.company >(prisma.company);
  // const workerRepositiory = new PrismaGeneric<Worker >(prisma.worker);
  return new DatabaseClass(companyRepositiory );
}

const Database = createDatabase();
export default Database;