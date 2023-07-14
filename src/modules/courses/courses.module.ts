import { Module } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
    imports:[PrismaModule],
    providers:[CourseRepository, CoursesService],
    controllers: [CoursesController]
})
export class CoursesModule {}
