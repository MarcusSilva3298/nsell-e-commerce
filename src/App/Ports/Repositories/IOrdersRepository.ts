import { Order } from '../../../Domain/Entities/Order';
import { OrderStatus } from '../../../Domain/Entities/OrderStatus';
import { OrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/OrderItemPersistanceDto';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';
import { OrderStatusValuesEnum } from '../../../Domain/Shared/Enums/OrderStatusValuesEnum';

export interface IOrdersRepository {
  findStatus(value: OrderStatusValuesEnum): OrderStatus;
  listStatus(): OrderStatus[];
  create(clientId: string, orderItem?: OrderItemPersistanceDto): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  delete(id: string): Promise<Order>;
  search(query: SearchOrdersQueryDto, clientId?: string): Promise<Order[]>;
}
