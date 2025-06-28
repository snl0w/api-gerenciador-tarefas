import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { DeleteTaskUseCase } from '@/application/use-cases/delete-task-use-case.js';
import { PrismaTasksRepository } from '@/infrastructure/database/prisma/repositories/prisma-tasks-repository.js';
import { TaskNotFoundError } from '@/application/use-cases/edit-task-use-case.js';

export async function deleteTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTaskParamsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = getTaskParamsSchema.parse(request.params);

    const tasksRepository = new PrismaTasksRepository();
    const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);

    await deleteTaskUseCase.execute({
      taskId: id,
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
