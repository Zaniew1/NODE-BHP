import { WorkerDatabase, WorkerDatabaseInterface } from '../../Workers/model/worker.model';
import { CompanyDatabase, CompanyDatabaseInterface } from '../../Company/model/company.model';
import { AuthDatabase, AuthDatabaseInterface } from '../../Auth/model/auth.model';

export class DatabaseClass {
  public company: CompanyDatabaseInterface = new CompanyDatabase();
  public worker: WorkerDatabaseInterface = new WorkerDatabase();
  public auth: AuthDatabaseInterface = new AuthDatabase();
  constructor() {}
}
