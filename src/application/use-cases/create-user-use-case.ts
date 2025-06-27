import { User } from '@/domain/entities/user';
import { IUsersRepository } from '@/domain/repositories/IUsersRepository';

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.');
  }
}

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password_hash: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password_hash,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = new User({
      name,
      email,
      password_hash,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
