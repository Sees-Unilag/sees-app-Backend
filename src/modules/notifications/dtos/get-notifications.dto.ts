import { IsInt, IsOptional } from 'class-validator';

export class GetNotificationDto {
  @IsOptional()
  @IsInt()
  take: number;

  @IsOptional()
  @IsInt()
  skip: number;
}
