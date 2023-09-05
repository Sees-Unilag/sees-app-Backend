import { IsString } from 'class-validator';

export class signInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export interface ISignInResponse {
  refreshToken: string;
  accessToken: string;
}
