// import { Company } from '@prisma/client';
// // import redisClient from '../../lib/redis';

// const COMPANY_KEY = (id: number) => `company:${id}`;
// const COMPANIES_ALL_KEY = 'companies:all';
// const TTL_SECONDS = 60 * 60;

// export class CompanyCache {
//   async findOne(id: number): Promise<Company | null> {
//     try {
//       const data = await redisClient.GET(COMPANY_KEY(id));
//       if (!data) return null;
//       return JSON.parse(data) as Company;
//     } catch {
//       return null;
//     }
//   }

//   async findMany(): Promise<Company[] | null> {
//     try {
//       const data = await redisClient.GET(COMPANIES_ALL_KEY);
//       if (!data) return null;
//       return JSON.parse(data) as Company[];
//     } catch {
//       return null;
//     }
//   }

//   async setMany(companies: Company[]): Promise<void> {
//     try {
//       await redisClient.SET(COMPANIES_ALL_KEY, JSON.stringify(companies), { EX: TTL_SECONDS });
//     } catch {}
//   }

//   async create(company: Company): Promise<void> {
//     try {
//       await Promise.all([redisClient.SET(COMPANY_KEY(company.id), JSON.stringify(company), { EX: TTL_SECONDS }), redisClient.DEL(COMPANIES_ALL_KEY)]);
//     } catch {}
//   }

//   async update(id: number, company: Company): Promise<void> {
//     try {
//       await Promise.all([redisClient.SET(COMPANY_KEY(id), JSON.stringify(company), { EX: TTL_SECONDS }), redisClient.DEL(COMPANIES_ALL_KEY)]);
//     } catch {}
//   }

//   async delete(id: number): Promise<void> {
//     try {
//       await Promise.all([redisClient.DEL(COMPANY_KEY(id)), redisClient.DEL(COMPANIES_ALL_KEY)]);
//     } catch {}
//   }
// }
