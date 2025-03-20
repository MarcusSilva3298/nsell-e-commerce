import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../App/Ports/Repositories/IUsersRepository';
import { User } from '../../../Domain/Entities/User';
import { DatabaseService } from '../database.service';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private readonly database: DatabaseService) {}

  async findById(id: string): Promise<User> {
    const dbUser = await this.database.user.findUnique({
      where: { id, deletedAt: null },
    });

    const user = new User().parseFromDatabase(dbUser);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const dbUser = await this.database.user.findUnique({
      where: { email, deletedAt: null },
    });

    const user = new User().parseFromDatabase(dbUser);

    return user;
  }
}
