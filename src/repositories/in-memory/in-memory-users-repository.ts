import { IUsersRepository } from '@/domain/repositories/IUsersRepository.js';
import { User } from '@/domain/entities/user.js';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }

  async save(user: User): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = user;
    }
  }
}
