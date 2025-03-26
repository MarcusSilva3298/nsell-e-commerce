import { ConflictException } from '@nestjs/common';
import { InvalidCredentialsException } from '../../../Domain/Errors/Auth/InvalidCredentialsException';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignInResponse';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { PresentersUtils } from '../../../Domain/Shared/Utils/PresentersUtils';
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

    if (!userExists.verifiedEmail)
      throw new ConflictException('Confirm your E-mail before continuing');

    const accessToken = this.tokenService.signAccess({ id: userExists.id });

    const refreshToken = this.tokenService.signRefresh({ id: userExists.id });

    return {
      accessToken,
      refreshToken,
      user: PresentersUtils.presentUser(userExists),
    };
  }
}
