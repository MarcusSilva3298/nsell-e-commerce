import { Product } from '../../../Domain/Entities/Product';
import { SearchProductsQueryDto } from '../../../Domain/Shared/Dtos/Products/SearchProductsQueryDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class SearchProductsUseCase
  implements IUseCase<Product[], [SearchProductsQueryDto]>
{
  constructor(private readonly productsRepository: IProductRepository) {}

  async execute(queries: SearchProductsQueryDto): Promise<Product[]> {
    return await this.productsRepository.search(queries);
  }
}
