import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatusValuesEnum } from '../../Enums/OrderStatusValuesEnum';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatusValuesEnum)
  @IsString()
  @IsNotEmpty()
  status: OrderStatusValuesEnum;
}
