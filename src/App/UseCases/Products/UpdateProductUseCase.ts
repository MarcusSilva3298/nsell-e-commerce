import { Product } from '../../../Domain/Entities/Product';
import { InvalidTagsException } from '../../../Domain/Errors/Products/InvalidTagsExcepiton';
import { ProductNotFoundException } from '../../../Domain/Errors/Products/ProductNotFoundException';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class UpdateProductUseCase
  implements IUseCase<Product, [string, ProductsFactoryDto]>
{
  constructor(private readonly productsRepository: IProductRepository) {}

  async execute(id: string, body: ProductsFactoryDto): Promise<Product> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) throw new ProductNotFoundException();

    const tagsAreValid = await this.productsRepository.validateTags(body.Tags);

    if (!tagsAreValid) throw new InvalidTagsException();

    return this.productsRepository.update(id, body, productExists.Tags!);
  }
}
