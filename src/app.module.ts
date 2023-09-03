import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
//import { CoursesModule } from './modules/courses';
import { NotificationsModule } from './modules/notifications';
//import { AdminsModule } from './modules/admins';
import { FileUploadModule } from './modules/file-upload';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import {AllExceptionsFilter, LoggerMiddleware, LoggerService}  from './common/';
import cloudinarConfig from './config/cloudinary';
import { PrismaModule } from './db';
import { AdminsModule } from './modules/admins';
import { CoursesModule } from './modules/courses';

@Module({
  imports: [
    //CoursesModule,
    FileUploadModule,
    PrismaModule,
    //AdminsModule,
    //NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [cloudinarConfig],
    }),
  ],
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
