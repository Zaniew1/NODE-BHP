import { Worker, Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export interface WorkerDatabaseInterface {
  findOne(id: number): Promise<Worker | null>;
  findMany(): Promise<Worker[]>;
  create(data: Prisma.WorkerUncheckedCreateInput): Promise<Worker>;
  update(id: number, data: Prisma.WorkerUncheckedUpdateInput): Promise<Worker>;
  delete(id: number): Promise<Worker>;
  deleteWorkersByCompanyId(companyId: number): Promise<Prisma.BatchPayload>;
}

export class WorkerDatabase implements WorkerDatabaseInterface {
  constructor() {}

  async findOne(id: number): Promise<Worker | null> {
    return prisma.worker.findUnique({
      where: { id },
    });
  }
  async findMany(): Promise<Worker[]> {
    return prisma.worker.findMany({});
  }

  async create(data: Prisma.WorkerUncheckedCreateInput): Promise<Worker> {
    return prisma.worker.create({
      data: data,
    });
  }
  async update(id: number, workerData: Prisma.WorkerUncheckedUpdateInput): Promise<Worker> {
    return prisma.worker.update({
      where: { id },
      data: workerData,
    });
  }
  async delete(id: number): Promise<Worker> {
    return prisma.worker.delete({
      where: { id },
    });
  }

  async deleteWorkersByCompanyId(companyId: number): Promise<Prisma.BatchPayload> {
    return prisma.worker.deleteMany({
      where: { companyId },
    });
  }
}
