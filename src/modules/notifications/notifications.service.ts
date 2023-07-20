import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { Notification } from '@prisma/client';
import { AddNotificationDto } from './dtos/add-notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly repository: NotificationsRepository) {}

  /**
   * Takes in the notification Id and returns the notification with given id if any
   * @param id - notification id
   * @returns the notification
   */
  async getNotification(id: string): Promise<Notification | null> {
    const notification = await this.repository.getNotification({
      where: { id },
    });

    return notification;
  }

  /**
   * Finds all notifications.
   */
  async getNotifications(): Promise<Notification[]> {
    const notification = await this.repository.getNotifications();
    return notification;
  }

  async addNotifications(data: AddNotificationDto): Promise<Notification> {
    const notification = await this.repository.addNotification({ data });
    return notification;
  }
}
