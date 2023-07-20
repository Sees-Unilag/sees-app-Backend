import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
  ValidateNested,
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

export class NotificationInputDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ValidateNested({ each: true })
  @Type(() => Link)
  @IsObject()
  links: Link;
}
