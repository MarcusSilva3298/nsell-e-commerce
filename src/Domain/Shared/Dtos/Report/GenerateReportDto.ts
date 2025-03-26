import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatusValuesEnum } from '../../Enums/OrderStatusValuesEnum';

export class GenerateReportDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsEnum(OrderStatusValuesEnum)
  @IsOptional()
  status?: string;
}
