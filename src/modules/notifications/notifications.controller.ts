import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  async getNotifications() {
    const notifications = await this.service.getNotifications();
    return { success: true, notifications };
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notification = this.service.getNotification(id);
    return { success: true, notification };
  }
}
