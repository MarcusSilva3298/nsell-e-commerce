import { ConflictException } from '@nestjs/common';
import { UserTypeEnum } from '@prisma/client';
import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { OrderNotFoundException } from '../../../Domain/Errors/Orders/OrderNotFoundException';
import { NotEnoughInStock } from '../../../Domain/Errors/Products/NotEnoughInStockException';
import { ProductNotFoundException } from '../../../Domain/Errors/Products/ProductNotFoundException';
import { HandleOrderItemDto } from '../../../Domain/Shared/Dtos/Orders/HandleOrderItemDto';
import { HandleOrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/HandleOrderItemPersistanceDto';
import { OrderStatusValuesEnum } from '../../../Domain/Shared/Enums/OrderStatusValuesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';

export class HandleOrderItemUseCase
  implements IUseCase<Order, [User, HandleOrderItemDto]>
{
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly productsRepository: IProductRepository,
  ) {}

  async execute(user: User, body: HandleOrderItemDto): Promise<Order> {
    const orderExists = await this.ordersRepository.findById(body.orderId);

    // Verify if Order exists and if user is owner or is admin
    if (
      !orderExists ||
      (orderExists.clientId !== user.Client!.id &&
        user.type !== UserTypeEnum.ADMIN)
    )
      throw new OrderNotFoundException();

    // Verify if Order is confirmed already
    if (
      orderExists.orderStatusValue !==
      (OrderStatusValuesEnum.AWAITING_PAYMENT as string)
    ) {
      throw new ConflictException(
        'Order already confirmed! Items can no longer be modified',
      );
    }

    const productExists = await this.productsRepository.findById(
      body.productId,
    );

    // Verify if Product exists and is in stock
    if (!productExists) throw new ProductNotFoundException();
    if (productExists.stock < body.quantity) throw new NotEnoughInStock();

    const persistanceDto = new HandleOrderItemPersistanceDto(
      body.orderId,
      orderExists.OrderItems!,
    );

    const itemIndex = orderExists.OrderItems!.findIndex(
      (item) => item.productId === body.productId,
    );

    if (itemIndex === -1) {
      persistanceDto.createItem(body, productExists);
    } else if (body.quantity !== 0) {
      persistanceDto.updateItem(body, itemIndex);
    } else {
      persistanceDto.deleteItem(itemIndex);
    }

    return await this.ordersRepository.handleOrderItem(persistanceDto);
  }
}
