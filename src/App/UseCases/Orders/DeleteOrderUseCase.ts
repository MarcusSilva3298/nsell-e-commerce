import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { OrderNotFoundException } from '../../../Domain/Errors/Orders/OrderNotFoundException';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';

export class DeleteOderUseCase implements IUseCase<Order, [string, User]> {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(id: string, user: User): Promise<Order> {
    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists || orderExists.clientId !== user.Client!.id)
      throw new OrderNotFoundException();

    return await this.ordersRepository.delete(id);
  }
}
