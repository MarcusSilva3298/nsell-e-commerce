import { Provider } from '@nestjs/common';
import { OrdersUseCasesEnum } from '../../Domain/Shared/Enums/OrdersUseCasesEnum';
import { OrdersRepository } from '../../Infra/Database/Repositories/OrdersRepository';
import { ProductsRepository } from '../../Infra/Database/Repositories/ProductsRepository';
import { IOrdersRepository } from '../Ports/Repositories/IOrdersRepository';
import { IProductRepository } from '../Ports/Repositories/IProductsRepository';
import { CreateOrderUseCase } from '../UseCases/Orders/CreateOrderUseCase';

export const ordersExports: string[] = Object.values(OrdersUseCasesEnum);

export const ordersProviders: Provider[] = [
  {
    provide: OrdersUseCasesEnum.CREATE,
    inject: [ProductsRepository, OrdersRepository],
    useFactory: (
      productsRepository: IProductRepository,
      ordersRepository: IOrdersRepository,
    ) => new CreateOrderUseCase(productsRepository, ordersRepository),
  },
  {
    provide: OrdersUseCasesEnum.READ,
    inject: [],
    useFactory: () => null,
  },
  {
    provide: OrdersUseCasesEnum.SEARCH,
    inject: [],
    useFactory: () => null,
  },
  {
    provide: OrdersUseCasesEnum.DELETE,
    inject: [],
    useFactory: () => null,
  },
];
