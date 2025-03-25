import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { OrderNotFoundException } from '../../../Domain/Errors/Orders/OrderNotFoundException';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { UserUtils } from '../../../Domain/Shared/Utils/UserUtils';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';

export class ReadOrderUseCase implements IUseCase<Order, [string, User]> {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(id: string, user: User): Promise<Order> {
    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists || UserUtils.isOwnerOrAdmin(orderExists.clientId, user))
      throw new OrderNotFoundException();

    return orderExists;
  }
}
