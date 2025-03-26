import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InvalidHeaderException } from '../../../Domain/Errors/Auth/InvalidHeaderException';
import { AuthUtils } from '../../../Domain/Shared/Utils/AuthUtils';

export const Token = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const token = AuthUtils.extractTokenFromHeader(request);

    if (!token) throw new InvalidHeaderException();

    return token;
  },
);
