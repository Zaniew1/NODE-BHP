import {  Worker, Company } from "../types/types";
import prisma from "../../lib/prisma"
import { DatabaseGeneric } from "./DatabaseGeneric";

class DatabaseClass {
  constructor( 
    public company: DatabaseGeneric<Company>,
    public worker: DatabaseGeneric<Worker>) {
   
  }
}


export function createDatabase( ):DatabaseClass{
  const companyRepositiory = new DatabaseGeneric<Company>(prisma.company);
  const workerRepositiory = new DatabaseGeneric<Worker>(prisma.worker);
  return new DatabaseClass(companyRepositiory, workerRepositiory);
}

const Database = createDatabase();
export default Database;