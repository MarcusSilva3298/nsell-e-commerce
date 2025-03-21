import { Product } from '../../../Domain/Entities/Product';
import { InvalidTagsException } from '../../../Domain/Errors/Products/InvalidTagsExcepiton';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class CreateProductUseCase
  implements IUseCase<Product, [ProductsFactoryDto]>
{
  constructor(private readonly productsRepository: IProductRepository) {}

  async execute(body: ProductsFactoryDto): Promise<Product> {
    const tagsAreValid = await this.productsRepository.validateTags(body.Tags);

    if (!tagsAreValid) throw new InvalidTagsException();

    return this.productsRepository.create(body);
  }
}
