import { Company, Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export interface CompanyDatabaseInterface {
  findOne(where: Prisma.CompanyWhereUniqueInput): Promise<Company | null>;
  findMany(where: Prisma.CompanyWhereInput): Promise<Company[]>;
  create(data: Prisma.CompanyCreateInput): Promise<Company>;
  update(id: number, data: Prisma.CompanyUpdateInput): Promise<Company>;
  delete(id: number): Promise<Company>;
}
export class CompanyDatabase implements CompanyDatabaseInterface {
  constructor() {}

  async findOne(where: Prisma.CompanyWhereUniqueInput): Promise<Company | null> {
    return prisma.company.findUnique({
      where: where,
    });
  }
  async findMany(where: Prisma.CompanyWhereUniqueInput): Promise<Company[]> {
    return prisma.company.findMany({
      where: where,
    });
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
