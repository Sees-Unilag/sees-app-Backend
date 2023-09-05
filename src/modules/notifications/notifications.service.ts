import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository, AddNotificationDto } from './';
import { Notification } from '@prisma/client';
import { FileUploadService } from '../file-upload';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly repository: NotificationRepository,
    private readonly fileUploadService: FileUploadService,
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
    const perPage = +process.env.PER_PAGE;
    const page = pageNumber > 0 ? pageNumber : 1;
    const skip = (page - 1) * perPage;
    const take = perPage;
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
    const { title, text, links } = addNotificationDto;
    const data = { title, text, imageUrl, links: { create: links } };
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
}
