import { IsOptional, IsString } from 'class-validator';

export class SearchOrdersQueryDto {
  @IsString()
  @IsOptional()
  productName: string;
}
