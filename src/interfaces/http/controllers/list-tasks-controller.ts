import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaTasksRepository } from '@/infrastructure/database/prisma/repositories/prisma-tasks-repository.js';
import { ListTasksUseCase } from '@/application/use-cases/list-tasks-use-case.js';
import { TaskPresenter } from '@/interfaces/http/presenters/task-presenter.js';

export async function listTasksController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listTasksQuerySchema = z.object({
    userId: z.string().uuid().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
  });

  try {
    const { userId, status } = listTasksQuerySchema.parse(request.query);

    const tasksRepository = new PrismaTasksRepository();
    const listTasksUseCase = new ListTasksUseCase(tasksRepository);

    const { tasks } = await listTasksUseCase.execute({
      userId,
      status,
    });

    return reply.status(200).send({
      tasks: tasks.map(TaskPresenter.toHTTP),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() });
    }

    throw error;
  }
}
