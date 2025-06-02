import { Filters } from "../Abstract/Filter";
import { DatabaseStrategy } from "../Abstract/DatabaseStrategy";
import {  Prisma } from "@prisma/client";

export class PrismaGeneric<CreateInput , Model extends PrismaCompanyInterface<CreateInput> | PrismaWorkerInterface<CreateInput>> implements DatabaseStrategy <CreateInput > {
    constructor(private model:Model ) {
    } 
  
    public async findOne(where:Filters): Promise<CreateInput | null> {
      const filters = this.filterAdapter(where)
      return await this.model.findFirst( { where: filters } );
    }
    public async findMany(where?: Filters): Promise<CreateInput[]> {
      const filters = this.filterAdapter(where || {})
      return await this.model.findMany(filters);
    }
  
    public async create(data: CreateInput ): Promise<CreateInput> {
      const entity = await this.model.create( {data}  );
      return entity;
    }
  
    public async update(id:number, data: Partial<CreateInput>): Promise<CreateInput> {
      const entity = await this.model.update({ where: {
        id,
      }, data});
      return entity;
    }
  
    public async delete(id:number): Promise<CreateInput> { 
      const entity = await this.model.delete({
        where: {
          id
        },
      } );
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

export type PrismaInterface<CreateInput> = PrismaCompanyInterface<CreateInput> | PrismaWorkerInterface< CreateInput>;


export interface PrismaCompanyInterface<CreateInput> {
  findUnique(args: Prisma.CompanyFindUniqueArgs): Promise<CreateInput | null>;
  findFirst(args?: Prisma.CompanyFindFirstArgs): Promise<CreateInput | null>;
  findMany(args?: Prisma.CompanyFindManyArgs): Promise<CreateInput[]>;
  create(args: { data: CreateInput }): Promise<CreateInput>;
  update(args: Prisma.CompanyUpdateArgs): Promise<CreateInput>;
  delete(args: Prisma.CompanyDeleteArgs): Promise<CreateInput>;
}

export interface PrismaWorkerInterface<CreateInput> {
  findUnique(args: Prisma.WorkerFindUniqueArgs): Promise<CreateInput | null>;
  findFirst(args?: Prisma.WorkerFindFirstArgs): Promise<CreateInput | null>;
  findMany(args?: Prisma.WorkerFindManyArgs): Promise<CreateInput[]>;
  create(args: { data: CreateInput }): Promise<CreateInput>;
  update(args: Prisma.WorkerUpdateArgs): Promise<CreateInput>;
  delete(args: Prisma.WorkerDeleteArgs): Promise<CreateInput>;
}