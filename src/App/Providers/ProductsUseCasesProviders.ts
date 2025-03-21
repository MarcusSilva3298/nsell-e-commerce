import { Provider } from '@nestjs/common';
import { ProductsUseCasesEnum } from '../../Domain/Shared/Enums/ProductsUseCasesenum';
import { ProductsRepository } from '../../Infra/Database/Repositories/ProductsRepository';
import { IProductRepository } from '../Ports/Repositories/IProductsRepository';
import { CreateProductUseCase } from '../UseCases/Products/CreateProductUseCase';

export const productsExports: string[] = Object.values(ProductsUseCasesEnum);

export const productsProviders: Provider[] = [
  {
    provide: ProductsUseCasesEnum.CREATE,
    inject: [ProductsRepository],
    useFactory: (productsRepository: IProductRepository) =>
      new CreateProductUseCase(productsRepository),
  },
];
