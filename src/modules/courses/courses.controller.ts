import { Controller, Get, Body, Param, Patch } from '@nestjs/common';
import { GetCoursesDto } from './dtos/get-courses.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  async getCourses(@Body() getCoursesDto: GetCoursesDto) {
    const courses = await this.service.getCourses(getCoursesDto);
    return { success: true, courses };
  }

  @Get(':id')
  async getCourse(@Param('id') id: string) {
    const course = await this.service.getCourse(id);
    return { success: true, course };
  }

  @Patch('document/:id')
  async verifyDocument(@Param('id') id: string) {
    const document = await this.service.verifyDocument(id);
    return document;
  }
}
