import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpUseCase } from '../../../src/App/UseCases/Auth/SignUpUseCase';
import { Client } from '../../../src/Domain/Entities/Client';
import { User } from '../../../src/Domain/Entities/User';
import { SignUpDto } from '../../../src/Domain/Shared/Dtos/Auth/SignUpDto';
import { ISignUpResponse } from '../../../src/Domain/Shared/Interfaces/ISignUpResponse';
import { DatabaseService } from '../../../src/Infra/Database/database.service';
import { ClientsRepository } from '../../../src/Infra/Database/Repositories/ClientsRepository';
import { UsersRepository } from '../../../src/Infra/Database/Repositories/UserRepository';
import { EnviromentService } from '../../../src/Infra/Services/enviroment.service';
import { HashService } from '../../../src/Infra/Services/hash.service';
import { MailService } from '../../../src/Infra/Services/mail.service';
import { TokenService } from '../../../src/Infra/Services/token.service';

describe('Auth Module - Sign Up', () => {
  let signUpUseCase: SignUpUseCase;
  let usersRepository: UsersRepository;
  let hashService: HashService;
  let tokenService: TokenService;
  let clientsRepository: ClientsRepository;
  let mailService: MailService;
  const body: SignUpDto = {
    contact: 'contact',
    address: 'address',
    email: 'email',
    fullname: 'fullname',
    name: 'name',
    password: 'password',
  };

  beforeAll(() => {
    const databaseService = new DatabaseService();
    usersRepository = new UsersRepository(databaseService);
    clientsRepository = new ClientsRepository(databaseService);

    const enviromentService = new EnviromentService(new ConfigService());
    hashService = new HashService(enviromentService);
    tokenService = new TokenService(enviromentService);
    mailService = new MailService(enviromentService, {} as MailerService);

    signUpUseCase = new SignUpUseCase(
      usersRepository,
      hashService,
      clientsRepository,
      tokenService,
      mailService,
    );

    jest
      .spyOn(usersRepository, 'findByEmail')
      .mockImplementation(() => Promise.resolve(null));

    jest
      .spyOn(hashService, 'hashPassword')
      .mockImplementation(() => Promise.resolve('hashedPassword'));

    jest.spyOn(clientsRepository, 'create').mockImplementation(
      () =>
        new Promise((resolve) => {
          const client = new Client();
          Object.defineProperty(client, 'userId', { value: 'clientId' });
          resolve(client);
        }),
    );

    jest
      .spyOn(tokenService, 'signAccess')
      .mockImplementation(() => 'accessToken');
    jest
      .spyOn(tokenService, 'signRefresh')
      .mockImplementation(() => 'refreshToken');
    jest
      .spyOn(tokenService, 'signConfirmMail')
      .mockImplementation(() => 'confirmMailToken');

    jest.spyOn(mailService, 'sendVerifyEmail').mockImplementation(() => {});
  });

  it('Should fail - email already in use', async () => {
    jest
      .spyOn(usersRepository, 'findByEmail')
      .mockImplementationOnce(() => Promise.resolve(new User()));

    await expect(signUpUseCase.execute(body)).rejects.toThrow(
      new BadRequestException('Email already in use'),
    );
  });

  it('Should succeed', async () => {
    expect(await signUpUseCase.execute(body)).toMatchObject<ISignUpResponse>({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
      client: expect.any(Client),
    });
  });
});
