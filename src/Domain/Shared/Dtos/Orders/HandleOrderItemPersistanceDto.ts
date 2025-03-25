import { v7 } from 'uuid';
import { OrderItem } from '../../../Entities/OrderItem';
import { Product } from '../../../Entities/Product';
import { HandleOrderItemDto } from './HandleOrderItemDto';

export class HandleOrderItemPersistanceDto {
  public orderId: string;
  public orderTotal: number;
  public allOrderItems: Partial<OrderItem>[];

  public updateItemDto?: {
    where: { id: string };
    data: { quantity: number; totalPrice: number };
  };

  public createItemDto?: {
    id: string;
    productId: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
  };

  public deleteItemDto?: {
    id: string;
  };

  constructor(orderId: string, allOrderItems: OrderItem[]) {
    Object.assign(this, { orderId, allOrderItems });

    return this;
  }

  private setTotal(): void {
    this.orderTotal = this.allOrderItems.reduce(
      (sum, item) => sum + item.totalPrice!,
      0,
    );
  }

  public createItem(body: HandleOrderItemDto, product: Product): void {
    const totalPrice = body.quantity * product.price;

    this.allOrderItems.push({
      quantity: body.quantity,
      pricePerUnit: product.price,
      totalPrice,
    });

    this.createItemDto = {
      id: v7(),
      productId: body.productId,
      quantity: body.quantity,
      pricePerUnit: product.price,
      totalPrice,
    };

    this.setTotal();
  }

  public updateItem(body: HandleOrderItemDto, index: number): void {
    const item = this.allOrderItems[index];

    this.allOrderItems[index] = {
      quantity: body.quantity,
      totalPrice: item.pricePerUnit! * body.quantity,
    };

    this.updateItemDto = {
      where: { id: item.id! },
      data: {
        quantity: body.quantity,
        totalPrice: item.pricePerUnit! * body.quantity,
      },
    };

    this.setTotal();
  }

  public deleteItem(index: number) {
    const item = this.allOrderItems[index];

    this.allOrderItems.splice(index, 1);

    this.deleteItemDto = { id: item.id! };

    this.setTotal();
  }
}
