import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { NotEnoughInStock } from '../../../Domain/Errors/Products/NotEnoughInStockException';
import { ProductNotFoundException } from '../../../Domain/Errors/Products/ProductNotFoundException';
import { CreateOrderItemDto } from '../../../Domain/Shared/Dtos/Orders/CreateOrderItemDto';
import { OrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/OrderItemPersistanceDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class CreateOrderUseCase
  implements IUseCase<Order, [User, CreateOrderItemDto]>
{
  constructor(
    private readonly productsRepository: IProductRepository,
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async execute(user: User, orderItem: CreateOrderItemDto): Promise<Order> {
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

    return await this.ordersRepository.create(
      user.Client!.id,
      orderItemPersistance,
    );
  }
}
