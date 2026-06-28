import { Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';
import CompanyCreateSchema from '../zodSchemas/create.company';

export interface CompanyDatabaseInterface {
  findOne(id: number): Promise<any>;
  findMany(): Promise<any>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
export class CompanyDatabase implements CompanyDatabaseInterface {
  constructor() {}

  async findOne(id: number): Promise<any> {
    return prisma.company.findUnique({
      where: { id },
    });
  }
  async findMany(): Promise<any> {
    return prisma.company.findMany({});
  }

  async create(data: any): Promise<any> {
    return prisma.company.create({
      data: data,
    });
  }
  async update(id: number, data: any): Promise<any> {
    return prisma.company.update({
      where: { id },
      data: data,
    });
  }
  async delete(id: number): Promise<any> {
    return prisma.company.delete({
      where: { id },
    });
  }
}
