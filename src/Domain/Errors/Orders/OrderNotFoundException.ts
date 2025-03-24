import { HttpExceptionOptions, NotFoundException } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Order Not Found', descriptionOptions);
  }
}
