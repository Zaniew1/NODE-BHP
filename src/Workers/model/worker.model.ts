import prisma from '../../lib/prisma';

export interface WorkerDatabaseInterface {
  findOne(id: number): Promise<any>;
  findMany(): Promise<any>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}

export class WorkerDatabase implements WorkerDatabaseInterface {
  constructor() {}

  async findOne(id: number): Promise<any> {
    return prisma.worker.findUnique({
      where: { id },
    });
  }
  async findMany(): Promise<any> {
    return prisma.worker.findMany({});
  }

  async create(data: any): Promise<any> {
    console.log(data);
    return prisma.worker.create({
      data: data,
    });
  }
  async update(id: number, workerData: any): Promise<any> {
    return prisma.worker.update({
      where: { id },
      data: workerData,
    });
  }
  async delete(id: number): Promise<any> {
    return prisma.worker.delete({
      where: { id },
    });
  }
}
