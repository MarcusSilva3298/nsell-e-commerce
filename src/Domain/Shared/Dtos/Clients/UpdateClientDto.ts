import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateClientDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}
