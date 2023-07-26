import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCoursesDto } from './dtos/get-courses.dto';
import { CoursesService } from './courses.service';
import { AdminGuard } from '../admins/admin.guard';

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

  @Post(':id/documents')
  @UseInterceptors(FileInterceptor('file'))
  async addDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    await this.service.addDocument(file, id);
    return { success: true, message: 'Document Successfully Added' };
  }

  @UseGuards(AdminGuard)
  @Patch('documents/:id')
  async verifyDocument(@Param('id') id: string) {
    const document = await this.service.verifyDocument(id);
    return { sucess: true, message: 'Verification Successful', document };
  }
}
