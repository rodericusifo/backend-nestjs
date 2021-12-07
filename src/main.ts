import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseFilter } from './response/response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  const responseFilter = app.get(ResponseFilter);
  app.useGlobalFilters(responseFilter);
  const configService = app.get(ConfigService);
  const logger = new Logger();

  // Global Prefix
  // app.setGlobalPrefix('/api');

  await app.listen(configService.get('http.port') || 3000, () => {
    logger.log(
      `Server running on http://${configService.get(
        'http.host',
      )}:${configService.get('http.port')}`,
      'NestApplication',
    );
  });
}
bootstrap();
