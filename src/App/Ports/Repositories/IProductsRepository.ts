import { OrderItem } from '../../../Domain/Entities/OrderItem';
import { Product } from '../../../Domain/Entities/Product';
import { Tag } from '../../../Domain/Entities/Tag';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { SearchProductsQueryDto } from '../../../Domain/Shared/Dtos/Products/SearchProductsQueryDto';
import { TagsFactoryDto } from '../../../Domain/Shared/Dtos/Products/TagsFactoryDto';

export interface IProductRepository {
  validateTags(tags: TagsFactoryDto[]): Promise<boolean>;
  create(body: ProductsFactoryDto): Promise<Product>;
  update(
    id: string,
    body: ProductsFactoryDto,
    existingTags: Tag[],
  ): Promise<Product>;
  validateStock(items: OrderItem[]): Promise<boolean>;
  delete(id: string): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  search(filters: SearchProductsQueryDto): Promise<Product[]>;
}
