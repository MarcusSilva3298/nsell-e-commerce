import { ConflictException, HttpExceptionOptions } from '@nestjs/common';

export class UnsuccesfulPaymentException extends ConflictException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Payment was not successful', descriptionOptions);
  }
}
