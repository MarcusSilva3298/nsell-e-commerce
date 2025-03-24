import { BaseEntity } from './Base';
import { Client } from './Client';
import { OrderItem } from './OrderItem';
import { OrderStatus } from './OrderStatus';

export class Order extends BaseEntity {
  public orderTotal: number;

  public readonly OrderItems?: OrderItem[];

  public readonly OrderStatus?: OrderStatus;
  public readonly orderStatusValue: string;

  public readonly Client?: Client;
  public readonly clientId: string;
}
