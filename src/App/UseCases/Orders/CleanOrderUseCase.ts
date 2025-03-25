import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { OrderAlreadyConfirmedException } from '../../../Domain/Errors/Orders/OrderAlreadyConfirmedException';
import { OrderNotFoundException } from '../../../Domain/Errors/Orders/OrderNotFoundException';
import { OrderStatusValuesEnum } from '../../../Domain/Shared/Enums/OrderStatusValuesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { UserUtils } from '../../../Domain/Shared/Utils/UserUtils';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';

export class CleanOrderUseCase implements IUseCase<Order, [string, User]> {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(id: string, user: User): Promise<Order> {
    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists || UserUtils.isNotOwnerOrAdmin(orderExists.clientId, user))
      throw new OrderNotFoundException();

    if (
      orderExists.orderStatusValue !==
      (OrderStatusValuesEnum.AWAITING_PAYMENT as string)
    )
      throw new OrderAlreadyConfirmedException();

    return await this.ordersRepository.cleanOrder(id);
  }
}
