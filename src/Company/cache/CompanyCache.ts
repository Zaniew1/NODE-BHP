import { Company } from '@prisma/client';
import redisClient from '../../lib/redis';

export interface CacheInterface<T> {
  findOne(userId: number, id: number): Promise<T | null>;
  findMany(userId: number): Promise<T[] | null>;
  setMany(userId: number, datas: T[]): Promise<void>;
  create(userId: number, data: T): Promise<void>;
  update(userId: number, id: number, data: T): Promise<void>;
  delete(userId: number, id: number): Promise<void>;
}

export class CompanyCache {
  private COMPANY_KEY = (userId: number, id: number) => `user:${userId}/company:${id}`;
  private TTL_SECONDS = 60 * 60;
  private COMPANIES_ALL_KEY = (userId: number) => `user:${userId}/companies:all`;
  async findOne(userId: number, id: number): Promise<Company | null> {
    try {
      const data = await redisClient.GET(this.COMPANY_KEY(userId, id));
      if (!data) return null;
      return JSON.parse(data) as Company;
    } catch {
      return null;
    }
  }

  async findMany(userId: number): Promise<Company[] | null> {
    try {
      const data = await redisClient.GET(this.COMPANIES_ALL_KEY(userId));
      if (!data) return null;
      return JSON.parse(data) as Company[];
    } catch {
      return null;
    }
  }

  async setMany(userId: number, companies: Company[]): Promise<void> {
    try {
      await redisClient.SET(this.COMPANIES_ALL_KEY(userId), JSON.stringify(companies), { EX: this.TTL_SECONDS });
    } catch {}
  }

  async create(userId: number, data: Company): Promise<void> {
    try {
      await Promise.all([
        redisClient.SET(this.COMPANY_KEY(userId, data.id), JSON.stringify(data), { EX: this.TTL_SECONDS }),
        redisClient.DEL(this.COMPANIES_ALL_KEY(userId)),
      ]);
    } catch {}
  }

  async update(userId: number, id: number, data: Company): Promise<void> {
    try {
      await Promise.all([
        redisClient.SET(this.COMPANY_KEY(userId, id), JSON.stringify(data), { EX: this.TTL_SECONDS }),
        redisClient.DEL(this.COMPANIES_ALL_KEY(userId)),
      ]);
    } catch {}
  }

  async delete(userId: number, id: number): Promise<void> {
    try {
      await Promise.all([redisClient.DEL(this.COMPANY_KEY(userId, id)), redisClient.DEL(this.COMPANIES_ALL_KEY(userId))]);
    } catch {}
  }
}
