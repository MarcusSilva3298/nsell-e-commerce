import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ProductNotFoundException } from '../../../Domain/Errors/Products/ProductNotFoundException';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class ReadProductUseCase implements IUseCase<AnyCatcher, [string]> {
  constructor(private readonly productsRepository: IProductRepository) {}

  async execute(id: string): Promise<any> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) throw new ProductNotFoundException();

    return productExists;
  }
}
