import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/courses.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminsModule } from './modules/admins/admins.module';

@Module({
  imports: [CoursesModule, NotificationsModule, AdminsModule],
})
export class AppModule {}
