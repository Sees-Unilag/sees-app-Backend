import { Module, forwardRef } from '@nestjs/common';
import { CourseRepository,CoursesService,CoursesController } from './';;
//import { FileUploadModule } from '../file-upload';

@Module({
  imports: [],
  providers: [CourseRepository, CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
