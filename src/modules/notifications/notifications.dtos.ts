import {
  IsNotEmpty,
  IsOptional,
  IsString,
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
  heading: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  links: Link;
}
export class ExamDateDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Use "yyyy-mm-dd" format.',
  })
  date: string;
}
