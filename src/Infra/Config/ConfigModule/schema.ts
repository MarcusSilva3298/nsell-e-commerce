import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class EnvClass {
  @Matches(/^postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/, {
    message: 'Must be a valid PostgreSQL connection',
  })
  @IsString()
  @Expose()
  DATABASE_URL: string;

  @ValidateIf((obj) => typeof obj.value === 'string')
  @IsString()
  @ValidateIf((obj) => typeof obj.value === 'number')
  @IsNumber()
  HASH_SALT_ROUNDS: string | number;

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
