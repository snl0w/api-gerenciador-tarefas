import { Task, TaskStatus } from '@/domain/entities/task.js';
import { ITasksRepository } from '@/domain/repositories/ITasksRepository.js';

interface ListTasksUseCaseRequest {
  userId?: string;
  status?: TaskStatus;
}

interface ListTasksUseCaseResponse {
  tasks: Task[];
}

export class ListTasksUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({
    userId,
    status,
  }: ListTasksUseCaseRequest): Promise<ListTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findMany({
      userId,
      status,
    });

    return { tasks };
  }
}
