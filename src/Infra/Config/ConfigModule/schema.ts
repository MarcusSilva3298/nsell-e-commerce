import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class EnvClass {
  @Matches(/^postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/, {
    message: 'Must be a valid PostgreSQL connection',
  })
  @IsString()
  @Expose()
  DATABASE_URL: string;

  @IsNumber()
  @Expose()
  HASH_ROUNDS: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  TOKEN_SECRET: string;

  @IsNumber()
  @Expose()
  TOKEN_EXPIRES_IN: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  REFRESH_SECRET: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  REFRESH_EXPIRES_IN: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  STRIPE_SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MAILTRAP_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  MAILTRAP_PORT: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MAILTRAP_AUTH_USER: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MAILTRAP_AUTH_PASS: string;
}
