import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from './notifications.repository';
import { Notification } from '@prisma/client';
import { NotificationInputDto } from './dtos/add-notifications.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NotificationsService {
  private perPage: number = +process.env.PER_PAGE;

  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: NotificationRepository,
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
    const skip = (page - 1) * this.perPage;
    const take = this.perPage;
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
    addNotificationDto: NotificationInputDto,
  ): Promise<Notification> {
    const { title, text, imageUrl, links } = addNotificationDto;
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
    updateNotificationDto: NotificationInputDto,
    id: string,
  ): Promise<Notification> {
    const { title, text, imageUrl, links } = updateNotificationDto;

    /**
     *throws an error if the notification is not found
     */
    const found = await this.getNotification(id);

    const data = {
      title,
      text,
      imageUrl,
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
   * Updates a notification by id.
   * @param id
   * @returns the deleted notification
   */
  async deleteNotification(id: string) {
    const found = await this.getNotification(id);

    if (!(found as unknown as NotificationInputDto).links) {
      /**
       *if perchance the 'links' for this notification is already deleted
       */
      return this.repository.deleteNotification({ where: { id } });
    } else {
      const [links, notification] = await this.prisma.$transaction([
        this.repository.deleteLink({ where: { notificationId: found.id } }),
        this.repository.deleteNotification({ where: { id } }),
      ]);
      return { ...notification, links };
    }
  }
}
