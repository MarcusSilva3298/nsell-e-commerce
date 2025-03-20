import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserTypeEnum } from '../../../Domain/Shared/Enums/UserTypeEnum';

@Injectable()
export class AdminOnly implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.type !== UserTypeEnum.ADMIN) return false;

    return true;
  }
}
