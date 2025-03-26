import { Provider } from '@nestjs/common';
import { AuthUseCasesEnum } from '../../Domain/Shared/Enums/AuthUseCasesEnum';
import { ClientsRepository } from '../../Infra/Database/Repositories/ClientsRepository';
import { UsersRepository } from '../../Infra/Database/Repositories/UserRepository';
import { HashService } from '../../Infra/Services/hash.service';
import { MailService } from '../../Infra/Services/mail.service';
import { TokenService } from '../../Infra/Services/token.service';
import { IClientsRepository } from '../Ports/Repositories/IClientsRepository';
import { IUserRepository } from '../Ports/Repositories/IUsersRepository';
import { IHashService } from '../Ports/Services/IHashService';
import { IMailService } from '../Ports/Services/IMailService';
import { ITokenService } from '../Ports/Services/ITokenService';
import { SignInUseCase } from '../UseCases/Auth/SignInUseCase';
import { SignUpUseCase } from '../UseCases/Auth/SignUpUseCase';

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
  {
    provide: AuthUseCasesEnum.SIGN_UP,
    inject: [
      UsersRepository,
      HashService,
      ClientsRepository,
      TokenService,
      MailService,
    ],
    useFactory: (
      usersRepository: IUserRepository,
      hashService: IHashService,
      clientsRepository: IClientsRepository,
      tokenSerice: ITokenService,
      mailService: IMailService,
    ) =>
      new SignUpUseCase(
        usersRepository,
        hashService,
        clientsRepository,
        tokenSerice,
        mailService,
      ),
  },
];
