import { describe, it, expect, beforeEach } from 'bun:test';
import {
  CreateTaskUseCase,
  UserNotFoundError,
} from './create-task-use-case.js';
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository.js';
import { User } from '@/domain/entities/user.js';

let tasksRepository: InMemoryTasksRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateTaskUseCase;

describe('Create Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateTaskUseCase(tasksRepository, usersRepository);
  });

  it('should be able to create a new task', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '123456',
    });
    usersRepository.items.push(user);

    const { task } = await sut.execute({
      title: 'Minha primeira tarefa',
      description: 'Descrição da tarefa',
      userId: user.id,
    });

    expect(task.id).toEqual(expect.any(String));
    expect(tasksRepository.items).toHaveLength(1);
    expect(tasksRepository.items[0].title).toBe('Minha primeira tarefa');
  });

  it('should not be able to create a task for a non-existent user', async () => {
    await expect(
      sut.execute({
        title: 'Tarefa fantasma',
        userId: 'id-de-usuario-inexistente',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
