import { Link } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  imageUrl: string;
}

// class Link {
//   facebook?: string;
//   instagram?: string;
//   twitter?: string;
//   linkedIn?: string;
//   github?: string;
// }
