import { DatabaseInterface } from "../types/types";

export class DatabaseGeneric<T> {
    constructor(private model: DatabaseInterface<T>) {}
  
    public async findOne(where: any): Promise<T | null> {
      return await this.model.findFirst({ where });
    }
  
    public async findAll(where?: any): Promise<T[]> {
      return await this.model.findMany({ where });
    }
  
    public async create(data: T): Promise<T> {
      const entity = await this.model.create({ data });
      return entity;
    }
  
    public async update(where: any, data1: Partial<T>): Promise<T> {
      const entity = await this.model.update({ where:where, data:data1 });
      return entity;
    }
  
    public async delete(where: any): Promise<T> { 
      const entity = await this.model.delete({ where });
      return entity
    }
  }