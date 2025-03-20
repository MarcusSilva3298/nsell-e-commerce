import { Exclude, instanceToPlain } from 'class-transformer';
import { UserTypeEnum } from '../Shared/Enums/UserTypeEnum';
import { BaseEntity } from './Base';

export class User extends BaseEntity {
  public name: string;
  public email: string;
  public verifiedEmail: boolean;
  public type: UserTypeEnum;

  @Exclude()
  public readonly password: string;

  public parseFromDatabase(props: any) {
    Object.assign(this, props);

    return this;
  }

  public present() {
    return instanceToPlain(this);
  }
}
