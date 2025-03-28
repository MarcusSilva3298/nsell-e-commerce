import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../App/Ports/Repositories/IUsersRepository';
import { User } from '../../../Domain/Entities/User';
import { DatabaseService } from '../database.service';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private readonly database: DatabaseService) {}

  async findById(id: string): Promise<User | null> {
    return await this.database.user.findUnique({
      include: { Client: true },
      where: { id, deletedAt: null },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.database.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async confirmEmail(id: string): Promise<User> {
    return await this.database.user.update({
      where: { id },
      data: { verifiedEmail: true },
    });
  }
}
