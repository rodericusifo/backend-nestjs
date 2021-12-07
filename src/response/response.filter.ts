import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class ResponseFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    console.log('exception', exception);
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();
    console.log('exception', exception);

    if (exception instanceof HttpException) {
      const status: number = exception.getStatus();
      const exceptionHttp: Record<string, any> = exception;
      const exceptionData: Record<string, any> = exceptionHttp.response;

      response.status(status).json({
        code: status,
        message: exceptionData.message,
        errors: exceptionData.errors,
      });
    } else {
      const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = 'internal server error';

      response.status(status).json({
        code: status,
        message: exception || message,
      });
    }
  }
}
