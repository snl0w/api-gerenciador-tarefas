import {
  ITasksRepository,
  FindManyFilters,
} from '@/domain/repositories/ITasksRepository.js';
import { Task } from '@/domain/entities/task.js';

export class InMemoryTasksRepository implements ITasksRepository {
  public items: Task[] = [];

  async create(task: Task): Promise<void> {
    this.items.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === id);
    return task || null;
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id);
    if (taskIndex >= 0) {
      this.items[taskIndex] = task;
    }
  }

  async findMany(filters: FindManyFilters): Promise<Task[]> {
    return this.items;
  }
  async delete(id: string): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === id);
    if (taskIndex >= 0) {
      this.items.splice(taskIndex, 1);
    }
  }
}
