import { Type } from 'class-transformer';
import { BaseEntity } from './Base';
import { User } from './User';

export class Client extends BaseEntity {
  public fullname: string;
  public contact: string;
  public address: string;

  @Type(() => User)
  public readonly User: User;
  public readonly userId: string;
}
