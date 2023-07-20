import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationInputDto } from './dtos/add-notifications.dto';
import { GetNotificationDto } from './dtos/get-notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  async getNotifications(@Body() getNotificationDto: GetNotificationDto) {
    const notifications = await this.service.getNotifications(
      getNotificationDto,
    );
    return { success: true, notifications };
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notification = await this.service.getNotification(id);
    return { success: true, notification };
  }

  @Post()
  async addNotifications(@Body() addNotificationDto: NotificationInputDto) {
    const notification = await this.service.addNotifications(
      addNotificationDto,
    );
    return { success: true, notification };
  }

  @Patch(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: NotificationInputDto,
  ) {
    const notification = await this.service.updateNotification(
      updateNotificationDto,
      id,
    );
    return { success: true, notification };
  }
  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    const notification = await this.service.deleteNotification(id);
    return { success: true, notification };
  }
}
