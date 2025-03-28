import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
import { IClientsRepository } from '../../../App/Ports/Repositories/IClientsRepository';
import { Client } from '../../../Domain/Entities/Client';
import { SignUpDto } from '../../../Domain/Shared/Dtos/Auth/SignUpDto';
import { SearchClientsQueryDto } from '../../../Domain/Shared/Dtos/Clients/SearchClientsQueryDto';
import { UpdateClientDto } from '../../../Domain/Shared/Dtos/Clients/UpdateClientDto';
import { DatabaseService } from '../database.service';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(data: SignUpDto): Promise<Client> {
    return await this.database.client.create({
      include: { User: true },
      data: {
        id: v7(),
        address: data.address,
        contact: data.address,
        fullname: data.fullname,
        User: {
          create: {
            id: v7(),
            email: data.email,
            name: data.name,
            password: data.password,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    return await this.database.client.update({
      where: { id },
      include: { User: true },
      data: {
        address: data.address,
        fullname: data.fullname,
        contact: data.contact,
        User: { update: { name: data.name } },
      },
    });
  }

  async findById(id: string): Promise<Client | null> {
    return await this.database.client.findUnique({
      where: { id, deletedAt: null },
      include: { User: true },
    });
  }

  async delete(client: Client): Promise<Client> {
    const email = client.User!.email.concat(new Date().toISOString());
    const now = new Date();

    return await this.database.client.update({
      where: { id: client.id },
      include: { User: true },
      data: {
        deletedAt: now,
        User: { update: { email, deletedAt: now } },
      },
    });
  }

  async search(filters: SearchClientsQueryDto): Promise<Client[]> {
    return await this.database.client.findMany({
      include: { User: true },
      where: {
        AND: [
          { deletedAt: null },
          filters.name
            ? {
                OR: [
                  { fullname: { contains: filters.name, mode: 'insensitive' } },
                  {
                    User: {
                      name: { contains: filters.name, mode: 'insensitive' },
                    },
                  },
                ],
              }
            : {},
          filters.email
            ? {
                User: {
                  email: { contains: filters.email, mode: 'insensitive' },
                },
              }
            : {},
          filters.contact
            ? { contact: { contains: filters.contact, mode: 'insensitive' } }
            : {},
          filters.address
            ? { address: { contains: filters.address, mode: 'insensitive' } }
            : {},
        ],
      },
    });
  }
}
