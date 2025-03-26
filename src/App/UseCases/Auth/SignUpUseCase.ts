import { BadRequestException } from '@nestjs/common';
import { SignUpDto } from '../../../Domain/Shared/Dtos/Auth/SignUpDto';
import { IPayload } from '../../../Domain/Shared/Interfaces/IPayload';
import { ISignUpResponse } from '../../../Domain/Shared/Interfaces/ISignUpResponse';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { PresentersUtils } from '../../../Domain/Shared/Utils/PresentersUtils';
import { IClientsRepository } from '../../Ports/Repositories/IClientsRepository';
import { IUserRepository } from '../../Ports/Repositories/IUsersRepository';
import { IHashService } from '../../Ports/Services/IHashService';
import { IMailService } from '../../Ports/Services/IMailService';
import { ITokenService } from '../../Ports/Services/ITokenService';

export class SignUpUseCase implements IUseCase<ISignUpResponse, [SignUpDto]> {
  constructor(
    private readonly usersRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly clientsRepository: IClientsRepository,
    private readonly tokenService: ITokenService,
    private readonly mailService: IMailService,
  ) {}

  async execute(body: SignUpDto): Promise<ISignUpResponse> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(
      body.email,
    );

    if (emailAlreadyInUse)
      throw new BadRequestException('Email already in use');

    body.password = await this.hashService.hashPassword(body.password);

    const client = await this.clientsRepository.create(body);

    const payload: IPayload = { id: client.userId };

    const accessToken = this.tokenService.signAccess(payload);
    const refreshToken = this.tokenService.signRefresh(payload);
    const confirmMailToken = this.tokenService.signConfirmMail(payload);

    this.mailService.sendVerifyEmail(body.email, {
      name: body.name,
      token: confirmMailToken,
    });

    return {
      accessToken,
      refreshToken,
      client: PresentersUtils.presentClient(client),
    };
  }
}
