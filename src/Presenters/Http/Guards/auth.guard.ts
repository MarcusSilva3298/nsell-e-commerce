// auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InvalidTokenContentException } from '../../../Domain/Errors/Auth/InvalidTokenContentException';
import { AuthUtils } from '../../../Domain/Shared/Utils/AuthUtils';
import { UsersRepository } from '../../../Infra/Database/Repositories/UserRepository';
import { TokenService } from '../../../Infra/Services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = AuthUtils.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Invalid Header');

    const payload = this.tokenService.verifiyAccess(token);

    const userExists = await this.usersRepository.findById(payload.id);

    if (!userExists) throw new InvalidTokenContentException();

    request['user'] = userExists;

    return true;
  }
}
