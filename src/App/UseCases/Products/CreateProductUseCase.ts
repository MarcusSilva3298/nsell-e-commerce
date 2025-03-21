import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { InvalidTagsException } from '../../../Domain/Errors/Products/InvalidTagsExcepiton';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class CreateProductUseCase
  implements IUseCase<AnyCatcher, [ProductsFactoryDto]>
{
  constructor(private readonly productsRepository: IProductRepository) {}

  async execute(body: ProductsFactoryDto): Promise<any> {
    const tagsAreValid = await this.productsRepository.validateTags(body.Tags);

    if (!tagsAreValid) throw new InvalidTagsException();

    return this.productsRepository.create(body);
  }
}
