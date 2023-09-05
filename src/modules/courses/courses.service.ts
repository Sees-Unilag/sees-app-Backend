import { Injectable } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { Course } from '@prisma/client';
import { GetCoursesDto } from './courses.dtos';
import { FileUploadService } from '../file-upload';
import { LoggerService } from '../logging';

@Injectable()
export class CoursesService {
  constructor(
    private readonly repository: CourseRepository,
    private readonly fileUploadService: FileUploadService,
    private readonly logger:LoggerService
  ) {}

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
   * Uploads file(s) to the cloud storage service
   * @param files
   * @param courseId 
   */
  async addDocuments(
    files: Express.Multer.File[],
    courseId: string,
  ) {
    for(const file of files) {
      const link = await this.fileUploadService.uploadFile(file);
      await this.repository.addDocument({
        name: file.originalname.split('.')[0],
        link,
        course: { connect: { id: courseId } },
      });
      this.logger.info(`New Document Added for CourseId:${courseId}, filename:${file.filename}`)
  }}}
