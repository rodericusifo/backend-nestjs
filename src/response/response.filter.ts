import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class ResponseFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status: number = exception.getStatus();
      const exceptionHttp: Record<string, any> = exception;
      const exceptionData: Record<string, any> = exceptionHttp.response;

      // Put The Logger in This Part
      console.log(exception);

      response.status(status).json({
        code: status,
        message: exceptionData.message,
        error: exceptionData.error,
      });
    } else {
      const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = 'Sorry, There is a trouble in our server';
      const error = 'Internal Server Error';

      // Put The Logger in This Part
      console.log(exception);

      response.status(status).json({
        code: status,
        message: message,
        error: error,
      });
    }
  }
}
