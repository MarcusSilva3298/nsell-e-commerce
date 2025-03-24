import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
import { Order } from '../../../Domain/Entities/Order';
import { OrderItemPersistanceDto } from '../../../Domain/Shared/Dtos/Orders/OrderItemPersistanceDto';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';
import { DatabaseService } from '../database.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly database: DatabaseService) {}

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
