import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class SearchProductsQueryDto {
  @IsString()
  @IsOptional()
  query: string;

  @IsString()
  @IsOptional()
  tags: string;

  @IsBooleanString()
  @IsOptional()
  inStock: string;
}
