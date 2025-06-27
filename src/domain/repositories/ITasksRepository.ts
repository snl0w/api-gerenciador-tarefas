import { Task, TaskStatus } from '@/domain/entities/task.js';

export interface FindManyFilters {
  userId?: string;
  status?: TaskStatus;
}

export interface ITasksRepository {
  create(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findMany(filters: FindManyFilters): Promise<Task[]>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}
