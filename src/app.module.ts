import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/courses.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [CoursesModule, NotificationsModule],
})
export class AppModule {}
