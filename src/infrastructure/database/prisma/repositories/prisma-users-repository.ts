import { IUsersRepository } from '@/domain/repositories/IUsersRepository';
import { prisma } from '@/infrastructure/database/prisma/mappers/client';
import { User } from '@/domain/entities/user';
import { PrismaUserMapper } from '@/infrastructure/database/prisma/mappers/prisma-user-mapper';

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
