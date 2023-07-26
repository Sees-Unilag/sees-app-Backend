import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/courses.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminsModule } from './modules/admins/admins.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import {APP_FILTER} from "@nestjs/core"
import { AllExceptionsFilter } from './common/exception/global-expection-filter';

@Module({
  imports: [
    CoursesModule,
    NotificationsModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    AdminsModule,
  ], providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }]
})
export class AppModule {}
