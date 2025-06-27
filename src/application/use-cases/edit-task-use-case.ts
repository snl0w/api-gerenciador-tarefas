import { Task } from '@/domain/entities/task.js';
import { ITasksRepository } from '@/domain/repositories/ITasksRepository.js';

export class TaskNotFoundError extends Error {
  constructor() {
    super('Task not found.');
  }
}

interface EditTaskUseCaseRequest {
  taskId: string;
  title: string;
  description?: string;
}

interface EditTaskUseCaseResponse {
  task: Task;
}

export class EditTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({
    taskId,
    title,
    description,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFoundError();
    }

    task.title = title;

    if (description !== undefined) {
      task.description = description;
    }

    await this.tasksRepository.save(task);

    return { task };
  }
}
