import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/infrastructure/database/prisma/repositories/prisma-users-repository';
import {
  CreateUserUseCase,
  UserAlreadyExistsError,
} from '@/application/use-cases/create-user-use-case';

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validar os dados de entrada com Zod
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { name, email, password } = createUserBodySchema.parse(request.body);

    // Instanciar as dependências
    const usersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    // Executar o caso de uso
    await createUserUseCase.execute({
      name,
      email,
      password_hash: password,
    });

    // Retornar uma resposta de sucesso
    return reply.status(201).send();
  } catch (error) {
    // Tratar erros conhecidos
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() });
    }
    throw error;
  }
}
