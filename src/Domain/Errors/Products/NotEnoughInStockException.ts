import { BadRequestException, HttpExceptionOptions } from '@nestjs/common';

export class NotEnoughInStock extends BadRequestException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Not enough items in stock of this product', descriptionOptions);
  }
}
