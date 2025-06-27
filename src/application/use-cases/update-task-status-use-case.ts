import { Task, TaskStatus } from '@/domain/entities/task.js';
import { ITasksRepository } from '@/domain/repositories/ITasksRepository.js';
import { TaskNotFoundError } from './edit-task-use-case.js';

interface UpdateTaskStatusUseCaseRequest {
  taskId: string;
  status: TaskStatus;
}

interface UpdateTaskStatusUseCaseResponse {
  task: Task;
}

export class UpdateTaskStatusUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({
    taskId,
    status,
  }: UpdateTaskStatusUseCaseRequest): Promise<UpdateTaskStatusUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFoundError();
    }

    task.status = status;

    await this.tasksRepository.save(task);

    return { task };
  }
}
