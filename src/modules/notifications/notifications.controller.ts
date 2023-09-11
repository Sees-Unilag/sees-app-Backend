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
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { NotificationsService, AddNotificationDto, ExamDateDto } from './';
import { AdminGuard } from '../admins';
import { HttpController, UUIDParam } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../file-upload';

@Controller('notifications')
export class NotificationsController extends HttpController {
  @Inject() private readonly service: NotificationsService;

  @Get()
  async getNotifications(@Query('page', ParseIntPipe) pageNumber: number) {
    const notifications = await this.service.getNotifications(pageNumber);
    return this.send(notifications);
  }

  @Get(':id')
  async getNotification(@UUIDParam('id') id: string) {
    const notification = await this.service.getNotification(id);
    const daystoExam = this.service.getDaystoExam();
    return this.send({ notification, daystoExam });
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addNotifications(
    @Body() body: AddNotificationDto,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
  ) {
    const notification = await this.service.addNotifications(body, image);
    return this.send(notification);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateNotification(
    @UUIDParam('id') id: string,
    @Body() body: AddNotificationDto,
  ) {
    const notification = await this.service.updateNotification(body, id);
    return this.send(notification);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteNotification(@UUIDParam('id') id: string) {
    await this.service.deleteNotification(id);
    return this.send();
  }

  @UseGuards(AdminGuard)
  @Put('exam-date')
  async updateExamDate(@Query() query: ExamDateDto) {
    this.service.updateExamDate(query.date);
    return this.send();
  }
}
