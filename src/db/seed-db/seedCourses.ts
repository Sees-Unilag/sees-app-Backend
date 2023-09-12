import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { coursesJson } from './coursesData';
import { Prisma } from '@prisma/client';

const prisma = new PrismaService();

/**
 * Seeds the database with the course details. Uses a transaction to ensure rollbak in the event
 * of network or db failure.
 */
const seedCourses = async () => {
  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      Promise.all(
        coursesJson.map(async (course) => {
          tx.course.create({ data: course });
        }),
      );
    });
    Logger.log('Successfully added Courses to Database');
  } catch (err) {
    Logger.error('Error adding Courses to database', err);
  }
};

seedCourses();
