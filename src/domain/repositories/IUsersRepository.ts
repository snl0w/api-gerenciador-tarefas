import { User } from '@/domain/entities/user';

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
