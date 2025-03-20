import { InvalidCredentialsException } from '../../../Domain/Errors/Auth/InvalidCredentialsException';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignInResponse';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IUserRepository } from '../../Ports/Repositories/IUsersRepository';
import { IHashService } from '../../Ports/Services/IHashService';
import { ITokenService } from '../../Ports/Services/ITokenService';

export class SignInUseCase implements IUseCase<ISignResponse, [SignInDto]> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(body: SignInDto): Promise<ISignResponse> {
    const userExists = await this.userRepository.findByEmail(body.email);

    if (!userExists) throw new InvalidCredentialsException();

    const isPassword = await this.hashService.compareHash(
      body.password,
      userExists.password,
    );

    if (!isPassword) throw new InvalidCredentialsException();

    const accessToken = this.tokenService.signAccess({ id: userExists.id });

    const refreshToken = this.tokenService.signRefresh({ id: userExists.id });

    const user = userExists.present();

    return { accessToken, refreshToken, user };
  }
}
