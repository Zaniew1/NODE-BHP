import { Filters } from "../Abstract/Filter";
import { DatabaseStrategy } from "../Abstract/DatabaseStrategy";
import {  Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
export class PrismaGeneric<T, Model extends PrismaInterface<T>> extends DatabaseStrategy <T > {
    constructor(private model: Model ) {
      super();
    } 
  
    public async findOne(where:Filters): Promise<T | null> {
      const filters = this.filterAdapter(where)
      return await this.model.findFirst( filters );
    }
    public async findMany(where?: Filters): Promise<T[]> {
      const filters = this.filterAdapter(where || {})
      return await this.model.findMany(filters);
    }
  
    public async create(data: T): Promise<T> {
      const entity = await this.model.create( { data } );
      return entity;
    }
  
    public async update(where: Filters, data: Partial<T>): Promise<T> {
      const filters = this.filterAdapter(where)
      const entity = await this.model.update({where: filters, data} );
      return entity;
    }
  
    public async delete(where: Filters): Promise<T> { 
      const filters = this.filterAdapter(where)
      const entity = await this.model.delete({where: filters});
      return entity
    }
    public filterAdapter(filters: Filters){
      const prismaFilter: Record<string, any> = {};
      for (const key in filters) {
        const value = filters[key];
        if (typeof value === 'object' && !Array.isArray(value)) {
          const transformed: Record<string, any> = {};
          for (const op in value) {
            switch (op) {
              case '$gte':
                transformed.gte = value[op];
                break;
              case '$lte':
                transformed.lte = value[op];
                break;
              case '$in':
                transformed.in = value[op];
                break;
              case '$ne':
                transformed.not = value[op];
                break;
              default:
                throw new Error(`Unsupported operator: ${op}`);
            }
          }
          prismaFilter[key] = transformed;
        } else {
          prismaFilter[key] = value;
        }
      }
      return  prismaFilter;
    }
  }

export type PrismaInterface<T> = PrismaCompanyInterface<T> | PrismaWorkerInterface<T>;


export interface PrismaCompanyInterface<DataType>  {
  findUnique(args: { where: Prisma.CompanyFindUniqueArgs<DefaultArgs> }): Promise<DataType | null>;
  findFirst(args?: { where?: Prisma.CompanyFindFirstArgs<DefaultArgs> }): Promise<DataType | null>;
  findMany(args?: { where?: Prisma.CompanyFindManyArgs<DefaultArgs> }): Promise<DataType[]>;
  create(args: Prisma.CompanyCreateArgs<DefaultArgs>): Promise<DataType>;
  update(args: { where: Prisma.CompanyUpdateArgs; data: Partial<DataType> }): Promise<DataType>;
  delete(args: { where: Prisma.CompanyDeleteArgs }): Promise<DataType>;
}
export interface PrismaWorkerInterface<DataType> {
  findUnique(args: { where: Prisma.WorkerFindUniqueArgs<DefaultArgs> }): Promise<DataType | null>;
  findFirst(args?: { where?: Prisma.WorkerFindFirstArgs<DefaultArgs> }): Promise<DataType | null>;
  findMany(args?: { where?: Prisma.WorkerFindManyArgs<DefaultArgs> }): Promise<DataType[]>;
  create(args: Prisma.WorkerCreateArgs<DefaultArgs>): Promise<DataType>;
  update(args: { where: Prisma.WorkerUpdateArgs; data: Partial<DataType> }): Promise<DataType>;
  delete(args: { where: Prisma.WorkerDeleteArgs }): Promise<DataType>;
}