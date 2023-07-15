import { IsNotEmpty } from 'class-validator';

export class GetNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;
}
