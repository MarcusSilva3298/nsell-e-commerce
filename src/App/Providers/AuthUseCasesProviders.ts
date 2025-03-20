import { Provider } from '@nestjs/common';
import { AuthUseCasesEnum } from '../../Domain/Shared/Enums/AuthUseCasesEnum';
import { UsersRepository } from '../../Infra/Database/Repositories/UserRepository';
import { HashService } from '../../Infra/Services/hash.service';
import { TokenService } from '../../Infra/Services/token.service';
import { IUserRepository } from '../Ports/Repositories/IUsersRepository';
import { IHashService } from '../Ports/Services/IHashService';
import { ITokenService } from '../Ports/Services/ITokenService';
import { SignInUseCase } from '../UseCases/Auth/SignInUseCase';

export const authExports: string[] = Object.values(AuthUseCasesEnum);

export const authProviders: Provider[] = [
  {
    provide: AuthUseCasesEnum.SIGN_IN,
    inject: [UsersRepository, HashService, TokenService],
    useFactory: (
      usersRepository: IUserRepository,
      hashService: IHashService,
      tokenSerice: ITokenService,
    ) => new SignInUseCase(usersRepository, hashService, tokenSerice),
  },
];
