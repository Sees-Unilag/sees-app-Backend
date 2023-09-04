import { Module } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { FileUploadModule } from '../file-upload/file_upload.module';

@Module({
  imports: [FileUploadModule],
  providers: [CourseRepository, CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
