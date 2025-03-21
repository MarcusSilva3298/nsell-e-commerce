import { Provider } from '@nestjs/common';
import { ProductsUseCasesEnum } from '../../Domain/Shared/Enums/ProductsUseCasesenum';

export const productsExports: string[] = Object.values(ProductsUseCasesEnum);

export const productsProviders: Provider[] = [
  {
    provide: ProductsUseCasesEnum.CREATE,
    inject: [],
    useFactory: () => false,
  },
];
