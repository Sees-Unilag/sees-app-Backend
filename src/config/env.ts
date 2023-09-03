import { validate } from 'src/common';
import { IsIn, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { config } from 'dotenv';

const environment = <const>['development', 'test', 'staging', 'production'];

export class Environment {
  @IsIn(environment)
  @IsNotEmpty()
  node_env: (typeof environment)[number];

  @IsInt()
  @IsNotEmpty()
  port: number;

  @IsNotEmpty()
  database_url: string;

  @IsNotEmpty()
  jwt_secret: string;

  @IsNumber()
  page_size: number;

  @IsNotEmpty()
  cloudinary_apisecret:string;

  @IsNotEmpty()
  cloudinary_apikey:string;
   
  @IsNotEmpty()
  cloudinary_cloudname:string;
   
  @IsNotEmpty()
  maxfile_size:number;

  @IsNotEmpty()
  accesstoken_expiresat: string;

  @IsNotEmpty()
  refreshtoken_expiresat: string;
}


config();
export const env = validate<Environment>(Environment, process.env);