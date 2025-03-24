import { OrderItem } from '../../../Entities/OrderItem';

export class OrderItemPersistanceDto implements Partial<OrderItem> {
  public readonly id?: string;

  public pricePerUnit: number;
  public quantity: number;
  public totalPrice: number;

  public productId: string;

  constructor(
    props: Omit<OrderItemPersistanceDto, 'id' | 'totalPrice'>,
    id?: string,
  ) {
    this.id = id;
    this.totalPrice = props.pricePerUnit * props.quantity;
    Object.assign(this, props);

    return this;
  }
}
