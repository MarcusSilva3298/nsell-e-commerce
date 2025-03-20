import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class EnvClass {
  @IsString()
  @Expose()
  DATABASE_URL: string;
}
