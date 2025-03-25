import { ConflictException, HttpExceptionOptions } from '@nestjs/common';

export class OrderAlreadyPaidException extends ConflictException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Order already paid and cannot be modified', descriptionOptions);
  }
}
