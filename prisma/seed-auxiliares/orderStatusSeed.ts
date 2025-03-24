import { OrderStatus } from '../../src/Domain/Entities/OrderStatus';
import { OrderStatusValuesEnum } from '../../src/Domain/Shared/Enums/OrderStatusValuesEnum';

export const orderStatusSeed: OrderStatus[] = [
  {
    id: '0195c97d-b245-7bb8-96bb-8f36b86928d0',
    value: OrderStatusValuesEnum.AWAITING_PAYMENT.toString(),
    label: 'awaiting payment',
    color: '#FFA500',
  },
  {
    id: '0195c97d-c4e4-70b8-8a76-a34b8c59f1c2',
    value: OrderStatusValuesEnum.AWAITING_CONFIRMATION.toString(),
    label: 'awaiting confirmation',
    color: '#FFD700',
  },
  {
    id: '0195c97e-0926-7855-b7a0-f248181e505c',
    value: OrderStatusValuesEnum.IN_PREPARATION.toString(),
    label: 'in preparation',
    color: '#1E90FF',
  },
  {
    id: '0195c97d-f291-7092-a699-286c55813232',
    value: OrderStatusValuesEnum.DISPATCHED.toString(),
    label: 'dispatched',
    color: '#9370DB',
  },
  {
    id: '0195c97d-d844-7301-a132-d6bb3253d7d9',
    value: OrderStatusValuesEnum.DELIVERED.toString(),
    label: 'delivered',
    color: '#32CD32',
  },
];
