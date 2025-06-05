import { Filters } from "../Abstract/Filter";
import { DatabaseStrategy } from "../Abstract/DatabaseStrategy";
import {  Prisma } from "@prisma/client";
import { FilterQuery } from "mongoose";
import prisma from "../../../lib/prisma";

export class PrismaGeneric<CreateInput , Model extends PrismaInterface<CreateInput> > implements DatabaseStrategy <CreateInput > {
    constructor(private model:Model ) {
    } 
  
    public async findOne(where:FilterQuery<CreateInput>): Promise<CreateInput | null> {
      const filters = this.filterAdapter(where)
      return await this.model.findFirst( { where: filters } );
    }
    public async findMany(where?: FilterQuery<CreateInput>): Promise<CreateInput[]> {
      const filters = this.filterAdapter(where || {}) 
      console.log(filters)

      return await this.model.findMany({where:filters});
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
    public filterAdapter(filters: FilterQuery<CreateInput>){
      console.log(JSON.stringify(filters));
     const prismaFilter = convertMongooseToPrismaFilter<CreateInput>(filters);
      console.log(JSON.stringify(prismaFilter));
     return prismaFilter;
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

function setDeep(obj: any, path: string[], value: any) {
  const key = path[0];
  if (path.length === 1) {
    obj[key] = value;
    return;
  }
  if (!obj[key]) obj[key] = {};
  setDeep(obj[key], path.slice(1), value);
}

function convertRegex(value: any): any {
  if (value instanceof RegExp) {
    const regexStr = value.source;
    return { contains: regexStr };
  }

  const starts = value.startsWith('^');
  const ends = value.endsWith('$');
  const core = value.replace(/^(\^)?(.*?)(\$)?$/, '$2');

  if (starts && ends) return { equals: core };
  if (starts) return { startsWith: core };
  if (ends) return { endsWith: core };
  return { contains: core };
}

function convertCondition(value: any): any {
  const condition: any = {};

  for (const op in value) {
    const val = value[op];

    switch (op) {
      case '$eq': condition.equals = val; break;
      case '$ne': condition.not = val; break;
      case '$gt': condition.gt = val; break;
      case '$gte': condition.gte = val; break;
      case '$lt': condition.lt = val; break;
      case '$lte': condition.lte = val; break;
      case '$in': condition.in = val; break;
      case '$nin': condition.notIn = val; break;
      case '$regex': Object.assign(condition, convertRegex(val)); break;
      default: break; // unsupported
    }
  }

  return condition;
}

function convertMongooseToPrismaFilter<T>(mongoFilter: FilterQuery<T>): any {
  if (!mongoFilter || typeof mongoFilter !== 'object') return {};

  const prismaFilter: any = {};

  for (const key in mongoFilter) {
    const val = mongoFilter[key];

    if (key === '$or') {
      prismaFilter.OR = val.map(convertMongooseToPrismaFilter);
    } else if (key === '$and') {
      prismaFilter.AND = val.map(convertMongooseToPrismaFilter);
    } else if (key === '$not') {
      prismaFilter.NOT = [convertMongooseToPrismaFilter(val)];
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      const ops = Object.keys(val);
      const isOperator = ops.every(op => op.startsWith('$'));

      const nested = isOperator
        ? convertCondition(val)
        : convertMongooseToPrismaFilter(val);

      setDeep(prismaFilter, key.split('.'), nested);
    } else {
      setDeep(prismaFilter, key.split('.'), { equals: val });
    }
  }

  return prismaFilter;
}