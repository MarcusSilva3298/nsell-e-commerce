import { HttpExceptionOptions, NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('User Not Found', descriptionOptions);
  }
}
