import { PrismaService } from '../prisma.service';
import { coursesJson } from './seedCoursesJson';

const prisma = new PrismaService();

const addCourses = async () => {
  for (const course of coursesJson) {
    prisma.course.create({
      data: course,
    });
  }
};

const seedCourses = async () => {
  try {
    await addCourses();
    console.log('Successfully addeD Courses to Database');
  } catch (err: any) {
    console.log('Error adding Courses to database', err);
  }
};

seedCourses();
