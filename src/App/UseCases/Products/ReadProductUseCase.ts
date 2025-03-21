import { Product } from '../../../Domain/Entities/Product';
import { ProductNotFoundException } from '../../../Domain/Errors/Products/ProductNotFoundException';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class ReadProductUseCase implements IUseCase<Product, [string]> {
  constructor(private readonly productsRepository: IProductRepository) {}

  async execute(id: string): Promise<Product> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) throw new ProductNotFoundException();

    return productExists;
  }
}
