import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Client } from '../../Entities/Client';
import { User } from '../../Entities/User';

export class PresentersUtils {
  static presentUser(data: any): User {
    return plainToInstance(User, instanceToPlain(data));
  }

  static presentClient(data: any): Client {
    return plainToInstance(Client, instanceToPlain(data));
  }
}
