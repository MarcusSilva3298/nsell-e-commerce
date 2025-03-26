import { HttpExceptionOptions, UnauthorizedException } from '@nestjs/common';

export class InvalidHeaderException extends UnauthorizedException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Invalid Header', descriptionOptions);
  }
}
