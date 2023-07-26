import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaModule } from 'src/database/prisma.module';
import { NotificationRepository } from './notifications.repository';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationRepository, NotificationsService],
})
export class NotificationsModule {}
