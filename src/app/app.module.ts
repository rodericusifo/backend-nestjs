import { Module } from '@nestjs/common';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { ResponseModule } from 'src/response/response.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from 'src/logger/logger.service';
import { LoggerModule } from 'src/logger/logger.module';
import Configuration from 'src/config/configuration';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
    }),
    WinstonModule.forRootAsync({
      inject: [LoggerService],
      imports: [LoggerModule],
      useFactory: (loggerService: LoggerService) =>
        loggerService.createLogger(),
    }),
    LoggerModule,
    ResponseModule,
  ],
})
export class AppModule {}
