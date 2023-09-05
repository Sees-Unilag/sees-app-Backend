import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CoursesService, GetCoursesDto } from './';
import { FileValidationPipe } from '../file-upload/';
import { HttpController, UUIDParam } from 'src/common';

@Controller('courses')
export class CoursesController extends HttpController {
  @Inject() private readonly service: CoursesService;

  @Get()
  async getCourses(@Body() body: GetCoursesDto) {
    const courses = await this.service.getCourses(body);
    return this.send(courses);
  }

  @Get(':id')
  async getCourse(@UUIDParam('id') id: string) {
    const course = await this.service.getCourse(id);
    return this.send(course);
  }

  @Post(':id/documents')
  @UseInterceptors(FilesInterceptor('files'))
  async addDocument(
    @UploadedFiles(new FileValidationPipe())
    files: Express.Multer.File[],
    @UUIDParam('id') id: string,
  ) {
    await this.service.addDocuments(files, id);
    return this.message('Document Successfully Added');
  }
}
