import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Client } from '../../../Domain/Entities/Client';
import { User } from '../../../Domain/Entities/User';
import { SearchClientsQueryDto } from '../../../Domain/Shared/Dtos/Clients/SearchClientsQueryDto';
import { UpdateClientDto } from '../../../Domain/Shared/Dtos/Clients/UpdateClientDto';
import { ClientsUseCasesEnum } from '../../../Domain/Shared/Enums/ClientsUseCasesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { GetUser } from '../Decorators/get-user.decorator';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/clients')
export class ClientsController {
  constructor(
    @Inject(ClientsUseCasesEnum.SEARCH)
    private readonly searchClientUseCase: IUseCase<
      Client[],
      [SearchClientsQueryDto]
    >,

    @Inject(ClientsUseCasesEnum.READ)
    private readonly readClientUseCase: IUseCase<Client, [string, User]>,

    @Inject(ClientsUseCasesEnum.UPDATE)
    private readonly updateClientUseCase: IUseCase<
      Client,
      [string, User, UpdateClientDto]
    >,

    @Inject(ClientsUseCasesEnum.DELETE)
    private readonly deleteClientUseCase: IUseCase<Client, [string, User]>,
  ) {}

  @Get()
  search(@Query() filters: SearchClientsQueryDto): Promise<Client[]> {
    return this.searchClientUseCase.execute(filters);
  }

  @Get('/:id')
  read(@Param('id') clientId: string, @GetUser() user: User): Promise<Client> {
    return this.readClientUseCase.execute(clientId, user);
  }

  @Put('/:id')
  update(
    @Param('id') clientId: string,
    @Body() body: UpdateClientDto,
    @GetUser() user: User,
  ): Promise<Client> {
    return this.updateClientUseCase.execute(clientId, user, body);
  }

  @Delete('/:id')
  delete(
    @Param('id') clientId: string,
    @GetUser() user: User,
  ): Promise<Client> {
    return this.deleteClientUseCase.execute(clientId, user);
  }
}
