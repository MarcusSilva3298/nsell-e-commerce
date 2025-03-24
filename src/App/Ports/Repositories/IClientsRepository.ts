import { Client } from '../../../Domain/Entities/Client';
import { SignUpDto } from '../../../Domain/Shared/Dtos/Auth/SignUpDto';
import { SearchClientsQueryDto } from '../../../Domain/Shared/Dtos/Clients/SearchClientsQueryDto';
import { UpdateClientDto } from '../../../Domain/Shared/Dtos/Clients/UpdateClientDto';

export interface IClientsRepository {
  create(data: SignUpDto): Promise<Client>;
  update(id: string, data: UpdateClientDto): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  delete(client: Client): Promise<Client>;
  search(filters: SearchClientsQueryDto): Promise<Client[]>;
}
