import { describe, it, expect, beforeEach } from 'bun:test';
import {
  CreateUserUseCase,
  UserAlreadyExistsError,
} from './create-user-use-case.js';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository.js';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: 'password123',
    });

    expect(user.id).toEqual(expect.any(String));

    expect(usersRepository.items[0].name).toBe('John Doe');
  });

  it('should not be able to create a user with an existing email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: 'password123',
    });

    await expect(
      sut.execute({
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        password_hash: 'password456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
