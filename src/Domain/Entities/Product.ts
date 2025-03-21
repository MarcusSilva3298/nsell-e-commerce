import { BaseEntity } from './Base';
import { Tag } from './Tag';

export class Product extends BaseEntity {
  public name: string;
  public description?: string | null;
  public price: number;
  public stock: number;

  public Tags?: Tag[];
}
