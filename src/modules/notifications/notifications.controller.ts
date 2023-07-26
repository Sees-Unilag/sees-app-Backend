import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationInputDto } from './dtos/add-notifications.dto';
import { AdminGuard } from '../admins/admin.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  async getNotifications(
    @Query('pageNumber', ParseIntPipe) pageNumber: number,
  ) {
    const notifications = await this.service.getNotifications(pageNumber);
    return { success: true, notifications };
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notification = await this.service.getNotification(id);
    return { success: true, notification };
  }

  @UseGuards(AdminGuard)
  @Post()
  async addNotifications(@Body() addNotificationDto: NotificationInputDto) {
    const notification = await this.service.addNotifications(
      addNotificationDto,
    );
    return { success: true, notification };
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    const notification = await this.service.deleteNotification(id);
    return { success: true, notification };
  }
}
