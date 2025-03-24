import { BaseEntity } from './Base';
import { Order } from './Order';

export class OrderStatus extends BaseEntity {
  public label: string;
  public value: string;
  public color: string;

  public readonly Orders?: Order[];
}
