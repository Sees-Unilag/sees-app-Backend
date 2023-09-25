import { Semester, Year } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { toLowerCase } from 'src/common';

export class GetCoursesQuery {
  @IsEnum(Year)
  @Transform(toLowerCase)
  year: Year;

  @IsEnum(Semester)
  @Transform(toLowerCase)
  semester: Semester;
}
