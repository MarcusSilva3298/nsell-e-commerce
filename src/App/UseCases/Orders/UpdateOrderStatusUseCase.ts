import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { OrderNotFoundException } from '../../../Domain/Errors/Orders/OrderNotFoundException';
import { UpdateOrderStatusDto } from '../../../Domain/Shared/Dtos/Orders/UpdateOrderStatusDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { UserUtils } from '../../../Domain/Shared/Utils/UserUtils';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';

export class UpdateOrderStatusUseCase
  implements IUseCase<Order, [string, UpdateOrderStatusDto, User]>
{
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(
    id: string,
    body: UpdateOrderStatusDto,
    user: User,
  ): Promise<Order> {
    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists || UserUtils.isNotOwnerOrAdmin(orderExists.clientId, user))
      throw new OrderNotFoundException();

    return await this.ordersRepository.updateOrderStatus(id, body.status);
  }
}
