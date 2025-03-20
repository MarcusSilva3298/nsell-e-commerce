import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface IErrorResponse {
  status: number;
  message: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorResponse: IErrorResponse;
    if (exception instanceof HttpException) {
      errorResponse = {
        status: exception.getStatus(),
        message: exception.message,
      };
    } else {
      errorResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
    }

    if (errorResponse.status === 500) console.log(exception);

    response.status(errorResponse.status).json(errorResponse);
  }
}
