import { WinstonLogger } from '@logger/logger.decorator';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HTTPHelper } from '@shared/helper/http.helper';

@Catch()
export class ResponseFilter implements ExceptionFilter {
  private readonly loggerConsole = new Logger(ResponseFilter.name);

  constructor(@WinstonLogger() private readonly loggerFile) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status: number = exception.getStatus();
      const exceptionHttp: Record<string, any> = exception;
      const exceptionData: Record<string, any> = exceptionHttp.response;

      this.loggerConsole.error(HTTPHelper.error(exception));
      this.loggerFile.error(exception);

      response.status(status).json({
        code: status,
        message: exceptionData.message,
        error: exceptionData.error,
      });
    } else {
      const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = 'Sorry, There is a trouble in our server';
      const error = 'Internal Server Error';

      this.loggerConsole.error(HTTPHelper.error(exception));
      this.loggerFile.error(exception);

      response.status(status).json({
        code: status,
        message: message,
        error: error,
      });
    }
  }
}
