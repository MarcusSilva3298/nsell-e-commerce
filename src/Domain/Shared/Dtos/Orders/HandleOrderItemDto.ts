import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class HandleOrderItemDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
