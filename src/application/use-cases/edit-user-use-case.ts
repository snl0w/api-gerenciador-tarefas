import { User } from '@/domain/entities/user.js';
import { IUsersRepository } from '@/domain/repositories/IUsersRepository.js';
import { UserNotFoundError } from './create-task-use-case.js';

interface EditUserUseCaseRequest {
  userId: string;
  name: string;
}

interface EditUserUseCaseResponse {
  user: User;
}

export class EditUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    name,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    // Encontra o usuário que queremos editar
    const user = await this.usersRepository.findById(userId);

    // Se não existir, lançar um erro
    if (!user) {
      throw new UserNotFoundError();
    }

    // Atualiza as propriedades da entidade
    user.name = name;

    // Salvar as alterações no repositório
    await this.usersRepository.save(user);

    return { user };
  }
}
