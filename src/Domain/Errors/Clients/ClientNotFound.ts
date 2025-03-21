import { HttpExceptionOptions, NotFoundException } from '@nestjs/common';

export class ClientNotFoundException extends NotFoundException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Client Not Found', descriptionOptions);
  }
}
