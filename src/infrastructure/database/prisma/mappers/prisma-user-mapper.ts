import { User as PrismaUser } from '@prisma/client';
import { User } from '@/domain/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password_hash,
    };
  }

  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password_hash: raw.password,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
