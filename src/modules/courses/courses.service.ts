import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { Course, Document } from '@prisma/client';
import { GetCoursesDto } from './dtos/get-courses.dto';

@Injectable()
export class CoursesService {
  private logger = new Logger('CoursesService');

  constructor(private readonly repository: CourseRepository) {}

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
        this.logger.error(error.code);
        throw new InternalServerErrorException(
          'An unexpected error has occurred, try again later',
        );
      }
    }
    return document;
  }
}
