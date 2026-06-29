import { Company, Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export interface CompanyDatabaseInterface {
  findOne(id: number): Promise<Company | null>;
  findMany(): Promise<Company[]>;
  create(data: Prisma.CompanyCreateInput): Promise<Company>;
  update(id: number, data: Prisma.CompanyUpdateInput): Promise<Company>;
  delete(id: number): Promise<Company>;
}
export class CompanyDatabase implements CompanyDatabaseInterface {
  constructor() {}

  async findOne(id: number): Promise<Company | null> {
    return prisma.company.findUnique({
      where: { id },
    });
  }
  async findMany(): Promise<Company[]> {
    return prisma.company.findMany({});
  }

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return prisma.company.create({
      data: data,
    });
  }
  async update(id: number, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return prisma.company.update({
      where: { id },
      data: data,
    });
  }
  async delete(id: number): Promise<Company> {
    return prisma.company.delete({
      where: { id },
    });
  }
}
