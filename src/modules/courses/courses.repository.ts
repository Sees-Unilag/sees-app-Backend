import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/db';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCourse(
    where: Prisma.CourseWhereUniqueInput,
  ): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where,
      include: { documents: true },
    });
  }

  async addCourse(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({ data });
  }

  async updateCourse(
    where: Prisma.CourseWhereUniqueInput,
    data: Prisma.CourseCreateInput,
  ): Promise<Course> {
    return this.prisma.course.update({
      where,
      data,
    });
  }

  async getCourses(where: Prisma.CourseWhereInput): Promise<Course[]> {
    const courses = await this.prisma.course.findMany()
    return courses;
  }

  async addDocument(data: Prisma.DocumentCreateInput) {
    const document = await this.prisma.document.create({
      data,
    });
    return document;
  }
}
