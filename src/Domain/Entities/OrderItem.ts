import { BaseEntity } from './Base';
import { Order } from './Order';
import { Product } from './Product';

export class OrderItem extends BaseEntity {
  public quantity: number;
  public pricePerUnit: number;
  public totalPrice: number;

  public readonly Order?: Order;
  public readonly orderId: string;

  public readonly Product?: Product;
  public readonly productId: string;
}
