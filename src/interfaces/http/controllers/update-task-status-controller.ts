import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UpdateTaskStatusUseCase } from '@/application/use-cases/update-task-status-use-case.js';
import { PrismaTasksRepository } from '@/infrastructure/database/prisma/repositories/prisma-tasks-repository.js';
import { TaskNotFoundError } from '@/application/use-cases/edit-task-use-case.js';

export async function updateTaskStatusController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTaskParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const updateTaskStatusBodySchema = z.object({
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  });

  try {
    const { id } = getTaskParamsSchema.parse(request.params);
    const { status } = updateTaskStatusBodySchema.parse(request.body);

    const tasksRepository = new PrismaTasksRepository();
    const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(
      tasksRepository,
    );

    await updateTaskStatusUseCase.execute({
      taskId: id,
      status,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
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
