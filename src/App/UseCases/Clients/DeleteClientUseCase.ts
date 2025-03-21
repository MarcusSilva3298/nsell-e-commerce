import { Client } from '../../../Domain/Entities/Client';
import { User } from '../../../Domain/Entities/User';
import { ClientNotFoundException } from '../../../Domain/Errors/Clients/ClientNotFound';
import { UserTypeEnum } from '../../../Domain/Shared/Enums/UserTypeEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { PresentersUtils } from '../../../Domain/Shared/Utils/PresentersUtils';
import { IClientsRepository } from '../../Ports/Repositories/IClientsRepository';

export class DeleteClientUseCase implements IUseCase<Client, [string, User]> {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async execute(clientId: string, user: User): Promise<Client> {
    const clientExists = await this.clientsRepository.findById(clientId);

    if (!clientExists) throw new ClientNotFoundException();

    if (user.type !== UserTypeEnum.ADMIN && clientExists.userId !== user.id)
      throw new ClientNotFoundException();

    const client = await this.clientsRepository.delete(clientExists);

    return PresentersUtils.presentClient(client);
  }
}
