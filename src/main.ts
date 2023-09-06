import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as responseTime from 'response-time';
import { NestExpressApplication } from '@nestjs/platform-express';
import { env } from './config';
import { NotFoundExceptionFilter } from './common';
import { AdminsService } from './modules/admins';
import { NotificationsService } from './modules/notifications';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(helmet());
  app.use(responseTime());
  app.setGlobalPrefix('/v1');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      skipMissingProperties: false,
    }),
  );
  await app
    .listen(env.port)
    .then(() => Logger.log(`app running on ${env.port}, SeesBackend🚀`));
  app.get(AdminsService).setupAdmin();
  app.get(NotificationsService).verifyDateJson()
}
bootstrap();
