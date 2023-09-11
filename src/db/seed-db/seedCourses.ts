import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { coursesJson } from './coursesData';

const prisma = new PrismaService();

const seedCourses = async () => {
  try {
    await Promise.all(
      coursesJson.map(async (course) => {
        await prisma.course.create({ data: course });
      }),
    );
    Logger.log('Successfully added Courses to Database');
  } catch (err) {
    Logger.error('Error adding Courses to database', err);
  }
};

seedCourses();
