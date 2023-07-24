import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/courses.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [CoursesModule, NotificationsModule, CloudinaryModule,
  ConfigModule.forRoot({isGlobal:true, envFilePath: [".env", ".env.development"]})],
})
export class AppModule {}
