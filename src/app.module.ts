import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [CourseModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
