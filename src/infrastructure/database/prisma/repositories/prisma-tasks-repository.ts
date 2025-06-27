import {
  ITasksRepository,
  FindManyFilters,
} from '@/domain/repositories/ITasksRepository.js';
import { prisma } from '@/infrastructure/database/prisma/client.js';
import { Task } from '@/domain/entities/task.js';
import { PrismaTaskMapper } from '@/infrastructure/database/prisma/mappers/prisma-task-mapper.js';

export class PrismaTasksRepository implements ITasksRepository {
  async create(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task);
    await prisma.task.create({ data });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return null;
    }
    return PrismaTaskMapper.toDomain(task);
  }

  async save(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task);
    await prisma.task.update({
      where: {
        id: task.id,
      },
      data,
    });
  }

  async findMany({ userId, status }: FindManyFilters): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        status,
      },
    });

    return tasks.map(PrismaTaskMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
