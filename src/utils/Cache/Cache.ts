import { REDIS_ON } from '../constants/env';

export class Cache {
  public company: CompanyCacheInterface | null;
  public worker: WorkerCacheInterface | null;
  constructor() {
    this.company = REDIS_ON ? new CompanyCache() : null;
    this.worker = REDIS_ON ? new WorkerCache() : null;
  }
}

interface WorkerCacheInterface {
  findOne(id: number): Promise<any>;
  findMany(): Promise<any>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
interface CompanyCacheInterface {
  findOne(id: number): Promise<any>;
  findMany(): Promise<any>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
class WorkerCache implements WorkerCacheInterface {
  findOne(id: number): Promise<any> {
    throw new Error('Method not implemented');
  }
  findMany(): Promise<any> {
    throw new Error('Method not implemented');
  }
  create(data: any): Promise<any> {
    throw new Error('Method not implemented');
  }
  update(id: number, data: any): Promise<any> {
    throw new Error('Method not implemented');
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented');
  }
}
class CompanyCache implements CompanyCacheInterface {
  findOne(id: number): Promise<any> {
    throw new Error('Method not implemented');
  }
  findMany(): Promise<any> {
    throw new Error('Method not implemented');
  }
  create(data: any): Promise<any> {
    throw new Error('Method not implemented');
  }
  update(id: number, data: any): Promise<any> {
    throw new Error('Method not implemented');
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented');
  }
}
