import { Request } from 'express';

export class AuthUtils {
  static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = (request.headers.authorization || '').split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
