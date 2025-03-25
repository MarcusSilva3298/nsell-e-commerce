import { Provider } from '@nestjs/common';
import { OrdersUseCasesEnum } from '../../Domain/Shared/Enums/OrdersUseCasesEnum';
import { OrdersRepository } from '../../Infra/Database/Repositories/OrdersRepository';
import { ProductsRepository } from '../../Infra/Database/Repositories/ProductsRepository';
import { IOrdersRepository } from '../Ports/Repositories/IOrdersRepository';
import { IProductRepository } from '../Ports/Repositories/IProductsRepository';
import { CleanOrderUseCase } from '../UseCases/Orders/CleanOrderUseCase';
import { CreateOrderUseCase } from '../UseCases/Orders/CreateOrderUseCase';
import { DeleteOderUseCase } from '../UseCases/Orders/DeleteOrderUseCase';
import { HandleOrderItemUseCase } from '../UseCases/Orders/HandleOrderItemUseCase';
import { ReadOrderUseCase } from '../UseCases/Orders/ReadOrderUseCase';
import { SearchOrdersUseCase } from '../UseCases/Orders/SearchOrdersUseCase';

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
    inject: [OrdersRepository],
    useFactory: (ordersRepository: IOrdersRepository) =>
      new ReadOrderUseCase(ordersRepository),
  },
  {
    provide: OrdersUseCasesEnum.SEARCH,
    inject: [OrdersRepository],
    useFactory: (ordersRepository: IOrdersRepository) =>
      new SearchOrdersUseCase(ordersRepository),
  },
  {
    provide: OrdersUseCasesEnum.DELETE,
    inject: [OrdersRepository],
    useFactory: (ordersRepository: IOrdersRepository) =>
      new DeleteOderUseCase(ordersRepository),
  },
  {
    provide: OrdersUseCasesEnum.HANDLE_ITEM,
    inject: [OrdersRepository, ProductsRepository],
    useFactory: (
      ordersRepository: IOrdersRepository,
      productsRepository: IProductRepository,
    ) => new HandleOrderItemUseCase(ordersRepository, productsRepository),
  },
  {
    provide: OrdersUseCasesEnum.CLEAN,
    inject: [OrdersRepository],
    useFactory: (ordersRepository: IOrdersRepository) =>
      new CleanOrderUseCase(ordersRepository),
  },
];
