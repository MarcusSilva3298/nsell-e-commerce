import { Provider } from '@nestjs/common';
import { ClientsUseCasesEnum } from '../../Domain/Shared/Enums/ClientsUseCasesEnum';
import { ClientsRepository } from '../../Infra/Database/Repositories/ClientsRepository';
import { IClientsRepository } from '../Ports/Repositories/IClientsRepository';
import { DeleteClientUseCase } from '../UseCases/Clients/DeleteClientUseCase';
import { ReadClientUseCase } from '../UseCases/Clients/ReadClientUseCase';
import { SearchClienstUseCase } from '../UseCases/Clients/SearchClientsUseCase';
import { UpdateClientUseCase } from '../UseCases/Clients/UpdateClientUseCase';

export const clientsExports: string[] = Object.values(ClientsUseCasesEnum);

export const clientsProviders: Provider[] = [
  {
    provide: ClientsUseCasesEnum.SEARCH,
    inject: [ClientsRepository],
    useFactory: (clientsRepository: IClientsRepository) =>
      new SearchClienstUseCase(clientsRepository),
  },
  {
    provide: ClientsUseCasesEnum.READ,
    inject: [ClientsRepository],
    useFactory: (clientsRepository: IClientsRepository) =>
      new ReadClientUseCase(clientsRepository),
  },
  {
    provide: ClientsUseCasesEnum.UPDATE,
    inject: [ClientsRepository],
    useFactory: (clientsRepository: IClientsRepository) =>
      new UpdateClientUseCase(clientsRepository),
  },
  {
    provide: ClientsUseCasesEnum.DELETE,
    inject: [ClientsRepository],
    useFactory: (clientsRepository: IClientsRepository) =>
      new DeleteClientUseCase(clientsRepository),
  },
];
