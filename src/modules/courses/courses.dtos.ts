import { Semester, Year } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class GetCoursesQuery {
  @IsEnum(Year)
  @Transform(({ value }) => (<string>value).toUpperCase())
  year: Year;

  @IsEnum(Semester)
  @Transform(({ value }) => (<string>value).toUpperCase())
  semester: Semester;
}
