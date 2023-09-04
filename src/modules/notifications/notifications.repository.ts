import { Injectable } from '@nestjs/common';
import { Notification, Prisma } from '@prisma/client';
import { PrismaService } from 'src/db';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getNotification(params: {
    where: Prisma.NotificationWhereUniqueInput;
  }): Promise<Notification | null> {
    const { where } = params;
    return this.prisma.notification.findUnique({
      where,
      include: { links: true },
    });
  }

  async addNotification(params: {
    data: Prisma.NotificationCreateInput;
  }): Promise<Notification> {
    const { data } = params;
    return this.prisma.notification.create({
      data,
      include: { links: true },
    });
  }

  async updateNotification(params: {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.NotificationUpdateInput;
  }): Promise<Notification> {
    const { where, data } = params;
    return this.prisma.notification.update({
      where,
      data,
      include: { links: true },
    });
  }

  deleteLink(params: { where: Prisma.LinkWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.link.delete({
      where,
    });
  }

  deleteNotification(params: { where: Prisma.NotificationWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.notification.delete({
      where,
      include: { links: true },
    });
  }

  async getNotifications(params: {
    skip?: number;
    take?: number;
  }): Promise<Notification[]> {
    const { skip, take } = params;
    return this.prisma.notification.findMany({
      include: { links: true },
      skip,
      take,
    });
  }
}