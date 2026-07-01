import { Company } from '@prisma/client';
import { CacheInterface, CompanyCache } from '../../Company/cache/CompanyCache';

export class CacheClass {
  public company: CacheInterface<Company> = new CompanyCache();
  constructor() {}
}
export const Cache = new CacheClass();
