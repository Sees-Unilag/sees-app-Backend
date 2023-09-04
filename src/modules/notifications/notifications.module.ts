import { Module } from '@nestjs/common';
import { NotificationsController, NotificationsService, NotificationRepository } from './';
import { JwtService } from '@nestjs/jwt';
import { AdminsModule } from '../admins';

@Module({
  imports: [AdminsModule],
  controllers: [NotificationsController],
  providers: [NotificationRepository, NotificationsService, JwtService],
})
export class NotificationsModule {}
