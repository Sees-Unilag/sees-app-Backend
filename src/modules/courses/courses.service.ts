import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { Course, Document } from '@prisma/client';
import { GetCoursesDto } from './dtos/get-courses.dto';
import FileUploadService from '../file-upload/file_upload.interface';

@Injectable()
export class CoursesService {
  constructor(
    private readonly repository: CourseRepository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  /**
   * Takes in the course Id and returns the course with given id if any
   * @param id - course id
   * @returns the course
   */
  async getCourse(id: string): Promise<Course | null> {
    const course = await this.repository.getCourse({ where: { id } });
    return course;
  }

  /**
   * Finds a list of courses for the given year and semester
   * @param year
   * @param semester
   */
  async getCourses(getCoursesDto: GetCoursesDto): Promise<Course[]> {
    const { year, semester } = getCoursesDto;
    const courses = await this.repository.getCourses({
      where: { year, semester },
    });
    return courses;
  }

  async addDocument(File: Express.Multer.File, courseId: string) {
    const link = await this.fileUploadService.uploadFile(File);
    await this.repository.addDocument({
      data: { link, course: { connect: { id: courseId } } },
    });
  }

  /**
   * Takes in the document Id and returns the document with given id if any
   * @param id - document id
   * @returns the document
   *
   */
  async verifyDocument(id: string) {
    let document: Document;
    try {
      document = await this.repository.verifyDocument({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('A document with this id does not exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return document;
  }
}
