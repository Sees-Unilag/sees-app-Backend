import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Inject
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService, GetCoursesDto } from './';
import {FileValidationPipe} from '../file-upload/';
import { HttpController, UUIDParam } from 'src/common';

@Controller('courses')
export class CoursesController extends HttpController{
  @Inject()private readonly service: CoursesService;

  @Get()
  async getCourses(@Body() body: GetCoursesDto) {
    const courses = await this.service.getCourses(body);
    return this.send(courses);
  }

  @Get(':id')
  async getCourse(@UUIDParam('id') id: string) {
    const course = await this.service.getCourse(id);
    return this.send(course)
  }

  @Post(':id/documents')
  @UseInterceptors(FileInterceptor('file'))
  async addDocument(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
    @UUIDParam('id') id: string,
  ) {
    await this.service.addDocument(file, file.originalname, id);
    return this.message('Document Successfully Added')
  }

}