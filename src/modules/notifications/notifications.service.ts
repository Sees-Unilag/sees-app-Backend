import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository, AddNotificationDto } from './';
import { Notification } from '@prisma/client';
import { FileUploadService } from '../file-upload';
import * as fs from 'fs';
import * as path from 'path';
import { env } from 'src/config';
import { LoggerService } from '../logging';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly repository: NotificationRepository,
    private readonly fileUploadService: FileUploadService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Takes in the notification Id and returns the notification with given id if any
   * @param id - notification id
   * @returns the notification
   */
  async getNotification(id: string): Promise<Notification | null> {
    const notification = await this.repository.getNotification({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification does not exist for this Id`);
    }
    return notification;
  }

  /**
   * Finds a list of notifications correspoding to the pagination
   * @param pageNumber
   */
  async getNotifications(pageNumber: number): Promise<Notification[]> {
    const page = pageNumber > 0 ? pageNumber : 1;
    const skip = (page - 1) * env.page_size;
    const take = env.page_size;
    const notifications = await this.repository.getNotifications({
      skip,
      take,
    });
    return notifications;
  }

  /**
   * Adds a notification.
   * @param title
   * @param text
   * @param imageUrl
   * @param links
   */
  async addNotifications(
    addNotificationDto: AddNotificationDto,
    image: Express.Multer.File,
  ): Promise<Notification> {
    const imageUrl = await this.fileUploadService.uploadFile(image);
    const { title, text, links, heading } = addNotificationDto;
    const data = { title, text, imageUrl, links: { create: links }, heading };
    const notification = await this.repository.addNotification({ data });
    return notification;
  }

  /**
   * Updates a notification by id.
   * @param title
   * @param text
   * @param imageUrl
   * @param links
   */
  async updateNotification(
    updateNotificationDto: AddNotificationDto,
    id: string,
  ): Promise<Notification> {
    const { title, text, links } = updateNotificationDto;

    /**
     *throws an error if the notification is not found
     */
    const found = await this.getNotification(id);

    const data = {
      title,
      text,
      links: {
        connectOrCreate: {
          // if perchance the links for this notification is deleted
          where: { notificationId: found.id },
          create: { ...links },
        },
        update: { ...links },
      },
    };
    const notification = await this.repository.updateNotification({
      data,
      where: { id: found.id },
    });

    return notification;
  }

  /**
   * Check if a notification with a given Id exists and delete if true.
   * @param id
   * @returns the deleted notification
   */
  async deleteNotification(id: string): Promise<void> {
    const found = await this.getNotification(id);
    if (found) {
      await this.repository.deleteNotification({ where: { id } });
    }
  }

  /**
   * update the exam date in the date.json file
   */
  updateExamDate(date: string): void {
    const config = this.readConfigFile();
    config.examDate = date;
    this.writeConfigFile(config);
  }

  /**
   * Returns the days difference between the current date and the exam date
   * @returns days to Exam
   */
  getDaystoExam(): number {
    const config = this.readConfigFile();
    const examDate = new Date(config.examDate);
    const currentDate = new Date();
    const daysDifference =
      (examDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDifference >= 0 ? Math.round(daysDifference) : 0;
  }

  /**
   * verifies on start up that the date.json exist and that it has a field "examDate"
   */
  verifyDateJson() {
    try {
      const dateFile = this.readConfigFile();
      if (!dateFile.examDate) {
        this.logger.error('Bootstrap Error,  Add "examDate":"" to date.json');
        process.exit(1);
      }
    } catch (err: any) {
      this.logger.error(`Bootstrap Error,
        Create a date.json file in the root folder and add "examDate" as a field`);
      process.exit(1);
    }
  }

  private readConfigFile(): Record<'examDate', string> {
    const file = path.join(__dirname, '..', '..', '..', 'date.json');
    const configFileContents = fs.readFileSync(file, 'utf8');
    return JSON.parse(configFileContents);
  }

  private writeConfigFile(config: Record<'examDate', string>): void {
    const file = path.join(__dirname, '..', '..', '..', 'date.json');
    fs.writeFileSync(file, JSON.stringify(config), 'utf8');
  }
}
