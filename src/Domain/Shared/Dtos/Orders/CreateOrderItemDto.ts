import { isEmpty, IsInt, IsString, ValidateIf } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @ValidateIf((obj) => !isEmpty(obj.quantity))
  productId: string;

  @IsInt()
  @ValidateIf((obj) => !isEmpty(obj.productId))
  quantity: number;
}
