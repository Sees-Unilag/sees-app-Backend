import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { MatchesWith } from '../decorators/matches-with.decorator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @MaxLength(20)
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MatchesWith('password', {
    message: 'The password and confirmPassword fields do not mattch',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  secretKey: string;
}
