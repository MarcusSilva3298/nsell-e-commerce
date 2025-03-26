import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TagsFactoryDto } from './TagsFactoryDto';

export class ProductsFactoryDto {
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TagsFactoryDto)
  Tags: TagsFactoryDto[];
}
