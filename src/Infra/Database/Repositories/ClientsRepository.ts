import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
import { IClientsRepository } from '../../../App/Ports/Repositories/IClientsRepository';
import { Client } from '../../../Domain/Entities/Client';
import { SignUpDto } from '../../../Domain/Shared/Dtos/Auth/SignUpDto';
import { UpdateClientDto } from '../../../Domain/Shared/Dtos/Clients/UpdateClientDto';
import { DatabaseService } from '../database.service';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(data: SignUpDto): Promise<Client> {
    return await this.database.client.create({
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
      include: { User: true },
    });
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    return await this.database.client.update({
      where: { id },
      data: {
        address: data.address,
        fullname: data.fullname,
        contact: data.contact,
        User: { update: { name: data.name } },
      },
      include: { User: true },
    });
  }

  async findById(id: string): Promise<Client | null> {
    return await this.database.client.findUnique({
      where: { id, deletedAt: null },
      include: { User: true },
    });
  }

  async delete(client: Client): Promise<Client> {
    const email = client.User.email.concat(new Date().toISOString());
    const now = new Date();

    return await this.database.client.update({
      where: { id: client.id },
      data: {
        deletedAt: now,
        User: { update: { email, deletedAt: now } },
      },
      include: { User: true },
    });
  }
}
