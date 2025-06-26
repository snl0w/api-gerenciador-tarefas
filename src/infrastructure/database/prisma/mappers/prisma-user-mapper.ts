// src/infrastructure/database/prisma/mappers/prisma-user-mapper.ts
import { User as PrismaUser } from '@prisma/client';
import { User } from 'C:/api-gerenciador-tarefas/src/domain/entities/user';

// Converte entre o formato do Domínio e o formato do Prisma
export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password_hash, // Note a mudança de nome
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
