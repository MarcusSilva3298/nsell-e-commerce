import { ConflictException, HttpExceptionOptions } from '@nestjs/common';

export class OrderAlreadyConfirmedException extends ConflictException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super(
      'Order already confirmed! Items can no longer be modified',
      descriptionOptions,
    );
  }
}
