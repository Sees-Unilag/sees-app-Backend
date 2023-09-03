import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from "helmet";
import { NestExpressApplication } from '@nestjs/platform-express';
//import { env } from './config';
//import { NotFoundExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors:true});
  app.use(helmet())  
  app.setGlobalPrefix('/v1');
  //app.useGlobalFilters(new NotFoundExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      skipMissingProperties: false,
    }),
  );
  await app
  .listen(3000)
  .then(() => Logger.log(`app running on ${3000}, SeesBackend🚀`));

}
bootstrap();