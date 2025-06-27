import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaTasksRepository } from '@/infrastructure/database/prisma/repositories/prisma-tasks-repository.js';
import { PrismaUsersRepository } from '@/infrastructure/database/prisma/repositories/prisma-users-repository.js';
import { CreateTaskUseCase, UserNotFoundError } from '@/application/use-cases/create-task-use-case.js';

export async function createTaskController(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    userId: z.string().uuid(),
  });

  try {
    const { title, description, userId } = createTaskBodySchema.parse(request.body);

    const tasksRepository = new PrismaTasksRepository();
    const usersRepository = new PrismaUsersRepository();
    const createTaskUseCase = new CreateTaskUseCase(tasksRepository, usersRepository);

    await createTaskUseCase.execute({
      title,
      description,
      userId,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
    }
    throw error;
  }
}