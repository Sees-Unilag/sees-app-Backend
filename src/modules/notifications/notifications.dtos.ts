import { Type, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
  ValidateNested,
  Matches,
} from 'class-validator';

class Link {
  @IsOptional()
  @IsString()
  facebook: string;

  @IsOptional()
  @IsString()
  instagram: string;

  @IsOptional()
  @IsString()
  twitter: string;

  @IsOptional()
  @IsString()
  linkedIn: string;

  @IsOptional()
  @IsString()
  github: string;
}

export class AddNotificationDto {
  @IsNotEmpty()
  @IsString()
  heading:string; 

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @ValidateNested({ each: true })
  @Type(() => Link)
  @IsObject()
  @IsOptional()
  links: Link;
}
export class ExamDateDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Use "yyyy-mm-dd" format.',
  })
  date: string;
}
