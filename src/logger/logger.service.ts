import {
  LOGGER_ENV,
  LOGGER_MAX_FILES,
  LOGGER_MAX_SIZE,
  LOGGER_NAME,
} from '@logger/logger.constant';
import { ILoggerOptions } from '@logger/logger.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  constructor(private configService: ConfigService) {}

  createLogger(): ILoggerOptions {
    const loggerEnv: boolean =
      this.configService.get('app.logger.system') || LOGGER_ENV;
    const timestamp: number = moment().valueOf();

    const configTransportDefault: DailyRotateFile = new DailyRotateFile({
      filename: `%DATE%.log`,
      dirname: `logs/${LOGGER_NAME}/default`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: LOGGER_MAX_SIZE,
      maxFiles: LOGGER_MAX_FILES,
      level: 'info',
    });

    const configTransportError: DailyRotateFile = new DailyRotateFile({
      filename: `%DATE%.log`,
      dirname: `logs/${LOGGER_NAME}/error`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: LOGGER_MAX_SIZE,
      maxFiles: LOGGER_MAX_FILES,
      level: 'error',
    });

    const transports = [];
    if (loggerEnv) {
      transports.push(configTransportError);
      transports.push(configTransportDefault);
    }

    transports.push(
      new winston.transports.Console({
        silent: true,
      }),
    );
    return {
      defaultMeta: {
        requestId: timestamp,
      },
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports,
    };
  }
}
