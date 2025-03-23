import { Type } from 'class-transformer';
import { BaseEntity } from './Base';
import { Order } from './Order';
import { User } from './User';

export class Client extends BaseEntity {
  public fullname: string;
  public contact: string;
  public address: string;

  @Type(() => Order)
  public Orders: Order[];

  @Type(() => User)
  public readonly User: User;
  public readonly userId: string;
}
