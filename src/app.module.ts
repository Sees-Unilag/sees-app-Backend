import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoursesModule } from './modules/courses/courses.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminsModule } from './modules/admins/admins.module';
import { FileUploadModule } from './modules/file-upload/file_upload.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
//import { AllExceptionsFilter } from './common/exception_filter';
import LoggerModule from './modules/logging/logger.module';
//import { LoggerMiddleware } from './common/http';

@Module({
  imports: [
    CoursesModule,
    NotificationsModule,
    FileUploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    AdminsModule,
    LoggerModule,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter,
  //   },
  // ],
})
export class AppModule {}

