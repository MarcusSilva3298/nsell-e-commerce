import { Provider } from '@nestjs/common';
import { ProductsUseCasesEnum } from '../../Domain/Shared/Enums/ProductsUseCasesEnum';
import { ProductsRepository } from '../../Infra/Database/Repositories/ProductsRepository';
import { IProductRepository } from '../Ports/Repositories/IProductsRepository';
import { CreateProductUseCase } from '../UseCases/Products/CreateProductUseCase';
import { DeleteProductUseCase } from '../UseCases/Products/DeleteProductUseCase';
import { ReadProductUseCase } from '../UseCases/Products/ReadProductUseCase';
import { SearchProductsUseCase } from '../UseCases/Products/SearchProductsUseCase';
import { UpdateProductUseCase } from '../UseCases/Products/UpdateProductUseCase';

export const productsExports: string[] = Object.values(ProductsUseCasesEnum);

export const productsProviders: Provider[] = [
  {
    provide: ProductsUseCasesEnum.CREATE,
    inject: [ProductsRepository],
    useFactory: (productsRepository: IProductRepository) =>
      new CreateProductUseCase(productsRepository),
  },
  {
    provide: ProductsUseCasesEnum.READ,
    inject: [ProductsRepository],
    useFactory: (productsRepository: IProductRepository) =>
      new ReadProductUseCase(productsRepository),
  },
  {
    provide: ProductsUseCasesEnum.SEARCH,
    inject: [ProductsRepository],
    useFactory: (productsRepository: IProductRepository) =>
      new SearchProductsUseCase(productsRepository),
  },
  {
    provide: ProductsUseCasesEnum.UPDATE,
    inject: [ProductsRepository],
    useFactory: (productsRepository: IProductRepository) =>
      new UpdateProductUseCase(productsRepository),
  },
  {
    provide: ProductsUseCasesEnum.DELETE,
    inject: [ProductsRepository],
    useFactory: (productsRepository: IProductRepository) =>
      new DeleteProductUseCase(productsRepository),
  },
];
