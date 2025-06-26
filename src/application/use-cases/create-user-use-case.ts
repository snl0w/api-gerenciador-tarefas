// src/application/use-cases/create-user-use-case.ts
import { User } from 'C:/api-gerenciador-tarefas/src/domain/entities/user';
import { IUsersRepository } from 'C:/api-gerenciador-tarefas/src/domain/repositories/IUsersRepository';
// Em um cenário real, teríamos um serviço para hash de senhas
// import { IPasswordHasher } from '../services/IPasswordHasher';

// Erro customizado para regras de negócio
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
  // O caso de uso recebe as dependências (repositórios, serviços) pelo construtor
  // Isso se chama Injeção de Dependência
  constructor(
    private usersRepository: IUsersRepository,
    // private passwordHasher: IPasswordHasher,
  ) {}

  async execute({
    name,
    email,
    password_hash,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    // REGRA DE NEGÓCIO: Não permitir criar usuários com o mesmo e-mail
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // Em um cenário real, faríamos o hash da senha aqui:
    // const password_hash = await this.passwordHasher.hash(password);

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
