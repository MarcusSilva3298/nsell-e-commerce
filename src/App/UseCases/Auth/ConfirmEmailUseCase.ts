import { User } from '../../../Domain/Entities/User';
import { InvalidTokenContentException } from '../../../Domain/Errors/Auth/InvalidTokenContentException';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUsersRepository';
import { ITokenService } from '../../Ports/Services/ITokenService';

export class ConfirmEmailUseCase implements IUseCase<User, [string]> {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(token: string): Promise<User> {
    const payload = this.tokenService.verifyConfirmMail(token);

    const userExists = await this.usersRepository.findById(payload.id);

    if (!userExists) throw new InvalidTokenContentException();

    return await this.usersRepository.confirmEmail(userExists.id);
  }
}
