import { ITasksRepository } from '@/domain/repositories/ITasksRepository.js';
import { TaskNotFoundError } from './edit-task-use-case.js';

interface DeleteTaskUseCaseRequest {
  taskId: string;
}

type DeleteTaskUseCaseResponse = void;

export class DeleteTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({
    taskId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFoundError();
    }

    await this.tasksRepository.delete(taskId);
  }
}
