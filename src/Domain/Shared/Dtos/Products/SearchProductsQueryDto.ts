import { IsArray, IsOptional, IsString } from 'class-validator';

export class SearchProductsQueryDto {
  @IsString()
  @IsOptional()
  query: string;

  @IsString()
  @IsArray()
  @IsOptional()
  tags: string[];

  @IsString()
  @IsOptional()
  inStock: boolean;
}
