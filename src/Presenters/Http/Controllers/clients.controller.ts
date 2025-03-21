import {
  Body,
  Controller,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Client } from '../../../Domain/Entities/Client';
import { User } from '../../../Domain/Entities/User';
import { UpdateClientDto } from '../../../Domain/Shared/Dtos/Clients/UpdateClientDto';
import { ClientsUseCasesEnum } from '../../../Domain/Shared/Enums/ClientsUseCasesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { GetUser } from '../Decorators/get-user.decorator';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/clients')
export class ClientsController {
  constructor(
    @Inject(ClientsUseCasesEnum.UPDATE)
    private readonly updateClientUseCase: IUseCase<
      Client,
      [string, User, UpdateClientDto]
    >,
  ) {}

  @Put('/:id')
  signIn(
    @Param('id') clientId: string,
    @Body() body: UpdateClientDto,
    @GetUser() user: User,
  ): Promise<Client> {
    return this.updateClientUseCase.execute(clientId, user, body);
  }
}
