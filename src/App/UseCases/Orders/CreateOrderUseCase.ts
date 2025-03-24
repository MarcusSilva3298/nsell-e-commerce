import { Order } from '../../../Domain/Entities/Order';
import { NotEnoughInStock } from '../../../Domain/Errors/Products/NotEnoughInStockException';
import { ProductNotFoundException } from '../../../Domain/Errors/Products/ProductNotFoundException';
import { CreateOrderItemDto } from '../../../Domain/Shared/Dtos/Orders/CreateOrderItemDto';
import { OrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/OrderItemPersistanceDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IClientsRepository } from '../../Ports/Repositories/IClientsRepository';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class CreateOrderUseCase
  implements IUseCase<Order, [string, CreateOrderItemDto]>
{
  constructor(
    private readonly clientsRepository: IClientsRepository,
    private readonly productsRepository: IProductRepository,
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async execute(userId: string, orderItem: CreateOrderItemDto): Promise<Order> {
    const client = await this.clientsRepository.findByUserId(userId);

    let orderItemPersistance: OrderItemPersistanceDto | undefined;

    if (orderItem.productId) {
      const productExists = await this.productsRepository.findById(
        orderItem.productId,
      );

      if (!productExists) throw new ProductNotFoundException();

      if (productExists.stock < orderItem.quantity)
        throw new NotEnoughInStock();

      orderItemPersistance = new OrderItemPersistanceDto({
        pricePerUnit: productExists.price,
        ...orderItem,
      });
    }

    return await this.ordersRepository.create(client!.id, orderItemPersistance);
  }
}
