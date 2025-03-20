import { HttpExceptionOptions, UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Invalid Credentials!', descriptionOptions);
  }
}
