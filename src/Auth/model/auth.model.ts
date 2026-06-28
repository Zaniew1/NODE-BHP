import prisma from '../../lib/prisma';

export interface AuthDatabaseInterface {
  findUserByEmail(email: string): Promise<any>;
  findUserById(id: number): Promise<any>;
  createUser(email: string, password: string): Promise<any>;
  createSession(userId: number, expiresAt: Date): Promise<any>;
  findSession(id: number): Promise<any>;
  deleteSession(id: number): Promise<any>;
  deleteExpiredSessions(userId: number): Promise<any>;
}

export class AuthDatabase implements AuthDatabaseInterface {
  constructor() {}

  async findUserByEmail(email: string): Promise<any> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number): Promise<any> {
    return prisma.user.findUnique({ where: { id } });
  }

  async createUser(email: string, password: string): Promise<any> {
    return prisma.user.create({ data: { email, password } });
  }

  async createSession(userId: number, expiresAt: Date): Promise<any> {
    return prisma.session.create({ data: { userId, expiresAt } });
  }

  async findSession(id: number): Promise<any> {
    return prisma.session.findUnique({ where: { id }, include: { user: true } });
  }

  async deleteSession(id: number): Promise<any> {
    return prisma.session.delete({ where: { id } });
  }

  async deleteExpiredSessions(userId: number): Promise<any> {
    return prisma.session.deleteMany({
      where: { userId, expiresAt: { lt: new Date() } },
    });
  }
}
