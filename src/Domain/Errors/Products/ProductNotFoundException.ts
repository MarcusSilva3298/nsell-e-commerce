import { HttpExceptionOptions, NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Product Not Found', descriptionOptions);
  }
}
