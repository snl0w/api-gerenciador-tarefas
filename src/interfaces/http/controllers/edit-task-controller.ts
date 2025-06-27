import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { EditTaskUseCase, TaskNotFoundError } from '@/application/use-cases/edit-task-use-case.js';
import { PrismaTasksRepository } from '@/infrastructure/database/prisma/repositories/prisma-tasks-repository.js';

export async function editTaskController(request: FastifyRequest, reply: FastifyReply) {
  const getTaskParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const editTaskBodySchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
  });

  try {
    const { id } = getTaskParamsSchema.parse(request.params);
    const { title, description } = editTaskBodySchema.parse(request.body);

    const tasksRepository = new PrismaTasksRepository();
    const editTaskUseCase = new EditTaskUseCase(tasksRepository);

    await editTaskUseCase.execute({
      taskId: id,
      title,
      description,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
    }
    throw error;
  }
}