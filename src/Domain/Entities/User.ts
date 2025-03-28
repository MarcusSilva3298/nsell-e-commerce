import { Exclude } from 'class-transformer';
import { UserTypeEnum } from '../Shared/Enums/UserTypeEnum';
import { BaseEntity } from './Base';
import { Client } from './Client';

type EnumToUnion<T extends Record<string, string | number>> = `${T[keyof T]}`;

export class User extends BaseEntity {
  public name: string;
  public email: string;
  public verifiedEmail: boolean;

  public readonly Client?: Client | null;

  @Exclude()
  public type: EnumToUnion<typeof UserTypeEnum>;

  @Exclude()
  public readonly password: string;
}
