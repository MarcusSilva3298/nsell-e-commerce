import { User } from '@prisma/client';
import { Order } from '../../../Domain/Entities/Order';
import { OrderAlreadyPaidException } from '../../../Domain/Errors/Orders/OrderAlreadyPaidException';
import { OrderNotFoundException } from '../../../Domain/Errors/Orders/OrderNotFoundException';
import { UnsuccesfulPaymentException } from '../../../Domain/Errors/Orders/UnsuccessfulPaymentException';
import { NotEnoughInStock } from '../../../Domain/Errors/Products/NotEnoughInStockException';
import { ConfirmOrderDto } from '../../../Domain/Shared/Dtos/Orders/ConfirmOrderDto';
import { OrderStatusValuesEnum } from '../../../Domain/Shared/Enums/OrderStatusValuesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { UserUtils } from '../../../Domain/Shared/Utils/UserUtils';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';
import { IProductRepository } from '../../Ports/Repositories/IProductsRepository';
import { IPaymentService } from '../../Ports/Services/IPaymentService';

export class ConfirmOrderUseCase
  implements IUseCase<Order, [string, User, ConfirmOrderDto]>
{
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly productsRepository: IProductRepository,
    private readonly paymentService: IPaymentService,
  ) {}

  async execute(
    orderId: string,
    user: User,
    body: ConfirmOrderDto,
  ): Promise<Order> {
    const orderExists = await this.ordersRepository.findById(orderId);

    if (!orderExists || UserUtils.isNotOwnerOrAdmin(orderExists.clientId, user))
      throw new OrderNotFoundException();

    if (
      orderExists.orderStatusValue !==
      (OrderStatusValuesEnum.AWAITING_PAYMENT as string)
    )
      throw new OrderAlreadyPaidException();

    const allItemsInStock = await this.productsRepository.validateStock(
      orderExists.OrderItems!,
    );

    if (!allItemsInStock) throw new NotEnoughInStock();

    const resultPayment = await this.paymentService.createPayment(
      orderExists.orderTotal,
      body.cardToken,
    );

    if (resultPayment.status !== 'succeeded')
      throw new UnsuccesfulPaymentException({
        cause: resultPayment.status,
        description: resultPayment.message,
      });

    return await this.ordersRepository.confirmOrderPayment(orderId);
  }
}
