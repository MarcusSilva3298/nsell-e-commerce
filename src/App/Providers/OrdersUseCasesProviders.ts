import { Provider } from '@nestjs/common';
import { OrdersUseCasesEnum } from '../../Domain/Shared/Enums/OrdersUseCasesEnum';

export const ordersExports: string[] = Object.values(OrdersUseCasesEnum);

export const ordersProviders: Provider[] = [
  {
    provide: OrdersUseCasesEnum.CREATE,
    inject: [],
    useFactory: () => null,
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
