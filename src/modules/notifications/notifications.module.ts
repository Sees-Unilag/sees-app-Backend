import { Module } from '@nestjs/common';
import {
  NotificationsController,
  NotificationsService,
  NotificationRepository,
} from './';
import { JwtService } from '@nestjs/jwt';
import { AdminsModule } from '../admins';
import { FileUploadModule } from '../file-upload';
import { LoggerModule } from '../logging';

@Module({
  imports: [AdminsModule, FileUploadModule, LoggerModule],
  controllers: [NotificationsController],
  providers: [NotificationRepository, NotificationsService, JwtService],
})
export class NotificationsModule {}
