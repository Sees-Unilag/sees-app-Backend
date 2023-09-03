import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository, GetCoursesDto } from './';
import { Course } from '@prisma/client';
import {FileUploadService} from '../file-upload/';
import { LoggerService } from 'src/common';

@Injectable()
export class CoursesService {
    @Inject() private readonly repository: CourseRepository;
    @Inject() private readonly fileUploadService: FileUploadService;
    @Inject() private readonly logger: LoggerService

  /**
   * Takes in the course Id and returns the course with given id if any
   * @param id - course id
   * @returns the course
   */
  async getCourse(id: string): Promise<Course | null> {
    const course = await this.repository.getCourse({ id });
    return course;
  }

  /**
   * Finds a list of courses for the given year and semester
   * @param year
   * @param semester
   */
  async getCourses(getCoursesDto: GetCoursesDto): Promise<Course[]> {
    const { year, semester } = getCoursesDto;
    return await this.repository.getCourses({ year, semester });
  }

  /**
   * Uploads a file to the cloud storage service
   * @param File 
   * @param filename 
   * @param courseId 
   */
  async addDocument(
    File: Express.Multer.File,
    filename: string,
    courseId: string,
  ) {
    const link = await this.fileUploadService.uploadFile(File);
    await this.repository.addDocument({
      name: filename,
      link,
      course: { connect: { id: courseId } },
    });
    this.logger.log(`New Document Added for CourseId:${courseId}, filename:${filename}`)
  }
}
