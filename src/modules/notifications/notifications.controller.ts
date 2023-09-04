import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { NotificationsService, AddNotificationDto } from './';
import { AdminGuard } from '../admins';
import { HttpController, UUIDParam } from 'src/common';

@Controller('notifications')
export class NotificationsController extends HttpController{
  @Inject() private readonly service: NotificationsService;

  @Get()
  async getNotifications(
    @Query('pageNumber', ParseIntPipe) pageNumber: number,
  ) {
    const notifications = await this.service.getNotifications(pageNumber);
    return this.send(notifications);
  }

  @Get(':id')
  async getNotification(@UUIDParam('id') id: string) {
    const notification = await this.service.getNotification(id);
    return this.send(notification);
  }

  @UseGuards(AdminGuard)
  @Post()
  async addNotifications(@Body() body :AddNotificationDto) {
    const notification = await this.service.addNotifications(body);
    return this.send(notification)
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateNotification(
    @UUIDParam('id') id: string,
    @Body() body: AddNotificationDto
  ) {
    const notification = await this.service.updateNotification(body, id);
    return this.send(notification)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteNotification(@UUIDParam('id') id: string) {
    await this.service.deleteNotification(id);
    return this.send();
  }
}