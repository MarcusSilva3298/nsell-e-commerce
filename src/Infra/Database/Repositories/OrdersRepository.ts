import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { v7 } from 'uuid';
import { IOrdersRepository } from '../../../App/Ports/Repositories/IOrdersRepository';
import { Order } from '../../../Domain/Entities/Order';
import { OrderStatus } from '../../../Domain/Entities/OrderStatus';
import { HandleOrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/HandleOrderItemPersistanceDto';
import { OrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/OrderItemPersistanceDto';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';
import { OrderStatusValuesEnum } from '../../../Domain/Shared/Enums/OrderStatusValuesEnum';
import { DatabaseService } from '../database.service';

@Injectable()
export class OrdersRepository implements OnModuleInit, IOrdersRepository {
  private statusMap = new Map<OrderStatusValuesEnum, OrderStatus>();

  constructor(private readonly database: DatabaseService) {}

  async onModuleInit() {
    const statuses = await this.database.orderStatus.findMany();

    statuses.forEach((status) => {
      const label = this.toOrderStatusValuesEnum(status.value);
      this.statusMap.set(label, status);
    });
  }

  private toOrderStatusValuesEnum(value: string): OrderStatusValuesEnum {
    const enumValue = Object.values(OrderStatusValuesEnum).find(
      (enumValue) => enumValue === (value as OrderStatusValuesEnum),
    );

    if (!enumValue) {
      Logger.error('Invalid order status string to enum value covnersion');
      Logger.fatal('Terminating the server');
      process.exit(1);
    }

    return enumValue;
  }

  findStatus(value: OrderStatusValuesEnum): OrderStatus {
    const status = this.statusMap.get(value);

    if (!status)
      throw new InternalServerErrorException('Order Status not found');

    return status;
  }

  listStatus(): OrderStatus[] {
    return Array.from(this.statusMap.values());
  }

  async create(
    clientId: string,
    orderItem?: OrderItemPersistanceDto,
  ): Promise<Order> {
    return await this.database.order.create({
      include: { OrderItems: true },
      data: {
        id: v7(),
        clientId,
        orderTotal: orderItem?.totalPrice || 0,
        OrderItems: orderItem
          ? {
              create: {
                id: v7(),
                pricePerUnit: orderItem.pricePerUnit,
                quantity: orderItem.quantity,
                totalPrice: orderItem.totalPrice,
                productId: orderItem.productId,
              },
            }
          : {},
      },
    });
  }

  async handleOrderItem(dto: HandleOrderItemPersistanceDto): Promise<Order> {
    return await this.database.order.update({
      include: { OrderItems: true },
      where: { id: dto.orderId },
      data: {
        orderTotal: dto.orderTotal,
        OrderItems: {
          create: dto.createItemDto || undefined,
          update: dto.updateItemDto || undefined,
          delete: dto.deleteItemDto || undefined,
        },
      },
    });
  }

  async cleanOrder(id: string): Promise<Order> {
    return await this.database.order.update({
      where: { id },
      data: { orderTotal: 0, OrderItems: { deleteMany: { orderId: id } } },
    });
  }

  async findById(id: string): Promise<Order | null> {
    return await this.database.order.findUnique({
      include: { OrderItems: true },
      where: { id, deletedAt: null },
    });
  }

  async delete(id: string): Promise<Order> {
    return await this.database.order.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async search(
    query: SearchOrdersQueryDto,
    clientId?: string,
  ): Promise<Order[]> {
    return await this.database.order.findMany({
      where: {
        clientId: clientId || undefined,
        deletedAt: null,
        OrderItems: {
          some: {
            Product: {
              name: { contains: query.productName, mode: 'insensitive' },
            },
          },
        },
      },
    });
  }
}
