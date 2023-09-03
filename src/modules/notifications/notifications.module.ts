import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationRepository } from './notifications.repository';
import { AdminsModule } from '../admins';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationRepository, NotificationsService],
  imports:[AdminsModule]
})
export class NotificationsModule {}
