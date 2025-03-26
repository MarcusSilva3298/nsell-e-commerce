import { HttpExceptionOptions, UnauthorizedException } from '@nestjs/common';

export class InvalidTokenContentException extends UnauthorizedException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Invalid Token Content', descriptionOptions);
  }
}
