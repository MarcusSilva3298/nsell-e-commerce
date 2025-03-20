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
  @Expose()
  REFRESH_EXPIRES_IN: number;
}
