import {
  Task as PrismaTask,
  TaskStatus as PrismaTaskStatus,
} from '@prisma/client';

import { Task, TaskStatus } from '@/domain/entities/task.js';

export class PrismaTaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return new Task(
      {
        title: raw.title,
        description: raw.description,
        status: raw.status as TaskStatus,
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status as PrismaTaskStatus,
      userId: task.userId,
    };
  }
}
