import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
