import { Injectable } from '@nestjs/common';
import { Notification, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getNotification(params: {
    where: Prisma.NotificationWhereUniqueInput;
  }): Promise<Notification | null> {
    const { where } = params;
    return this.prisma.notification.findUnique({
      where,
    });
  }

  async addNotification(params: {
    data: Prisma.NotificationCreateInput;
  }): Promise<Notification> {
    const { data } = params;
    return this.prisma.notification.create({ data, include: { links: true } });
  }

  async updateNotification(params: {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.NotificationCreateInput;
  }): Promise<Notification> {
    const { where, data } = params;
    return this.prisma.notification.update({
      where,
      data,
      include: { links: true },
    });
  }

  async getNotifications(): Promise<Notification[]> {
    return this.prisma.notification.findMany({ include: { links: true } });
  }
}
