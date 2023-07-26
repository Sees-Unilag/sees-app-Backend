import { Module } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { FileUploadModule } from '../file-upload/file_upload.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, FileUploadModule],
  providers: [CourseRepository, CoursesService, JwtService],
  controllers: [CoursesController],
})
export class CoursesModule {}
