import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoursesModule } from './modules/courses';
import { NotificationsModule } from './modules/notifications';
import { AdminsModule } from './modules/admins';
import { FileUploadModule } from './modules/file-upload';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception_filter';
import { LoggerModule } from './modules/logging';
import { PrismaModule } from './db';
import { LoggerMiddleware } from './common/http';
import { JwtModule } from '@nestjs/jwt';
import { env } from './config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.jwt_secret,
    }),
    LoggerModule,
    CoursesModule,
    PrismaModule,
    AdminsModule,
    NotificationsModule,
    FileUploadModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
