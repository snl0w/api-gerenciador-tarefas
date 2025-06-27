import { IUsersRepository } from '@/domain/repositories/IUsersRepository';
import { prisma } from '@/infrastructure/database/prisma/mappers/client';
import { User } from '@/domain/entities/user';
import { PrismaUserMapper } from '@/infrastructure/database/prisma/mappers/prisma-user-mapper';

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);
    await prisma.user.create({ data });
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });
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

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
