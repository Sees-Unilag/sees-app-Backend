import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must be at least 8 characters long, include uppercase and lowercase letters, at least one numeric digit, and at least one special character.',
    })
  password: string;
}
