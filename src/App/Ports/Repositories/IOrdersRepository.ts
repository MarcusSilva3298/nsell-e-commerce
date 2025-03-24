import { Order } from '../../../Domain/Entities/Order';
import { OrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/OrderItemPersistanceDto';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';

export interface IOrdersRepository {
  create(clientId: string, orderItem?: OrderItemPersistanceDto): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  delete(id: string): Promise<Order>;
  search(query: SearchOrdersQueryDto, clientId?: string): Promise<Order[]>;
}
