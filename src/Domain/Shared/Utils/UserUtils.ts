import { User } from '../../Entities/User';
import { UserTypeEnum } from '../Enums/UserTypeEnum';

export class UserUtils {
  static isOwnerOrAdmin(clientId: string, user: User) {
    return clientId === user.Client!.id || user.type === UserTypeEnum.ADMIN;
  }
}
