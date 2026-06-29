import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export class CompanyFile {
  private readonly basePath: string;

  constructor(basePath: string = path.resolve(process.cwd(), 'files/company')) {
    this.basePath = basePath;
  }

  private resolvePath(loggedUserID: string, fileName: string): string {
    const safeUser = path.basename(loggedUserID);
    const safeName = path.basename(fileName);
    return path.join(this.basePath, safeUser, safeName);
  }

  async setFile(loggedUserID: string, file: File): Promise<string> {
    const target = this.resolvePath(loggedUserID, file.name);
    await fs.mkdir(path.dirname(target), { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(target, buffer);
    return target;
  }
  async getFile(loggedUserID: string, fileName: string): Promise<File> {
    const target = this.resolvePath(loggedUserID, fileName);
    const buffer = await fs.readFile(target);
    return new File([new Uint8Array(buffer)], fileName);
  }
}
