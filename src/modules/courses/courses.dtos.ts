import { Semester, Year } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class GetCoursesDto {
  @IsEnum(Year)
  year: Year;

  @IsEnum(Semester)
  semester: Semester;
}