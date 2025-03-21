import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Client } from '../../Entities/Client';
import { User } from '../../Entities/User';

export class PresentersUtils {
  static presentUser(data: any): Record<string, any> {
    const convertedPrismaEntity = plainToInstance(User, data);

    return instanceToPlain(convertedPrismaEntity);
  }

  static presentClient(data: any): Record<string, any> {
    const convertedPrismaEntity = plainToInstance(Client, data);

    return instanceToPlain(convertedPrismaEntity);
  }
}
