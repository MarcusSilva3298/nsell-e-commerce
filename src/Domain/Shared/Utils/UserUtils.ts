import { User } from '../../Entities/User';
import { UserTypeEnum } from '../Enums/UserTypeEnum';

export class UserUtils {
  static isNotOwnerOrAdmin(clientId: string, user: User) {
    return clientId !== user.Client!.id && user.type !== UserTypeEnum.ADMIN;
  }
}
