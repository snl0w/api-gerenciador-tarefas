import { IUsersRepository } from 'C:/api-gerenciador-tarefas/src/domain/repositories/IUsersRepository';
import { prisma } from 'C:/api-gerenciador-tarefas/src/infrastructure/database/prisma/mappers/client';
import { User } from 'C:/api-gerenciador-tarefas/src/domain/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);
    await prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}