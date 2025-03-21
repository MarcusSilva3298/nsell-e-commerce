import { BadRequestException, HttpExceptionOptions } from '@nestjs/common';

export class InvalidTagsException extends BadRequestException {
  constructor(descriptionOptions?: string | HttpExceptionOptions) {
    super('Some of the selected Tags are invalid', descriptionOptions);
  }
}
