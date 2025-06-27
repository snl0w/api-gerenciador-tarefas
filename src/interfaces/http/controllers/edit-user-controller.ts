import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { EditUserUseCase } from '@/application/use-cases/edit-user-use-case.js';
import { PrismaUsersRepository } from '@/infrastructure/database/prisma/repositories/prisma-users-repository.js';
import { UserNotFoundError } from '@/application/use-cases/create-task-use-case.js';

export async function editUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const editUserBodySchema = z.object({
    name: z.string().min(2),
  });

  try {
    const { id } = getUserParamsSchema.parse(request.params);
    const { name } = editUserBodySchema.parse(request.body);

    const usersRepository = new PrismaUsersRepository();
    const editUserUseCase = new EditUserUseCase(usersRepository);

    await editUserUseCase.execute({
      userId: id,
      name,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() });
    }
    throw error;
  }
}
