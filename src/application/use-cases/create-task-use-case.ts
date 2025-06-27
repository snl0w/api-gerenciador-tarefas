import { Task, TaskStatus } from '@/domain/entities/task.js';
import { ITasksRepository } from '@/domain/repositories/ITasksRepository.js';
import { IUsersRepository } from '@/domain/repositories/IUsersRepository.js';

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found.');
  }
}

interface CreateTaskUseCaseRequest {
  title: string;
  description?: string;
  userId: string;
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: ITasksRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    title,
    description,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const task = new Task({
      title,
      description,
      userId,
      status: 'PENDING' as TaskStatus,
    });

    await this.tasksRepository.create(task);

    return {
      task,
    };
  }
}
