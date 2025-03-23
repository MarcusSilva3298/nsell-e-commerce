import { BaseEntity } from './Base';
import { Client } from './Client';
import { OrderItem } from './OrderItem';

export class Order extends BaseEntity {
  public orderTotal: number;

  public readonly OrderItems?: OrderItem[];

  public readonly Client?: Client;
  public readonly clientId: string;
}
