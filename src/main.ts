import { AppModule } from '@app/app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFilter } from '@response/response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  const configService = app.get(ConfigService);
  const appPrefix = configService.get('app.prefix');
  const logger = new Logger();
  const config = new DocumentBuilder()
    .setTitle('E-Commerce App API Documentation')
    .setDescription('This is an E-Commerce App API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(appPrefix)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new ResponseFilter());
  app.setGlobalPrefix(appPrefix);
  SwaggerModule.setup(`${appPrefix}/docs`, app, document);

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
