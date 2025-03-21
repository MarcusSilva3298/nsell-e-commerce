import { Client } from '../../../Domain/Entities/Client';
import { SearchClientsQueryDto } from '../../../Domain/Shared/Dtos/Clients/SearchClientsQueryDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { PresentersUtils } from '../../../Domain/Shared/Utils/PresentersUtils';
import { IClientsRepository } from '../../Ports/Repositories/IClientsRepository';

export class SearchClienstUseCase
  implements IUseCase<Client[], [SearchClientsQueryDto]>
{
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async execute(filters: SearchClientsQueryDto): Promise<Client[]> {
    const clients = await this.clientsRepository.search(filters);

    const presentedClients = clients.map((client) => {
      return PresentersUtils.presentClient(client);
    });

    return presentedClients;
  }
}
