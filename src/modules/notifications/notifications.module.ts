import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaModule } from 'src/database/prisma.module';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsRepository, NotificationsService],
})
export class NotificationsModule {}
