import { BaseEntity } from './Base';
import { Product } from './Product';

export class Tag extends BaseEntity {
  public label: string;
  public value: string;

  public readonly Products?: Product[];
}
