import 'reflect-metadata';
import { CreateOrderUseCase } from '../../../src/App/UseCases/Orders/CreateOrderUseCase';
import { Client } from '../../../src/Domain/Entities/Client';
import { Order } from '../../../src/Domain/Entities/Order';
import { Product } from '../../../src/Domain/Entities/Product';
import { User } from '../../../src/Domain/Entities/User';
import { NotEnoughInStock } from '../../../src/Domain/Errors/Products/NotEnoughInStockException';
import { ProductNotFoundException } from '../../../src/Domain/Errors/Products/ProductNotFoundException';
import { CreateOrderItemDto } from '../../../src/Domain/Shared/Dtos/Orders/CreateOrderItemDto';
import { DatabaseService } from '../../../src/Infra/Database/database.service';
import { OrdersRepository } from '../../../src/Infra/Database/Repositories/OrdersRepository';
import { ProductsRepository } from '../../../src/Infra/Database/Repositories/ProductsRepository';

function mockUser(): User {
  const user = new User();
  const client = new Client();

  Object.defineProperty(client, 'id', { value: 'id' });
  Object.defineProperty(user, 'Client', { value: client });

  return user;
}

describe('Order Module - Create Order', () => {
  let createOrderUseCase: CreateOrderUseCase;
  let productsRepository: ProductsRepository;
  let ordersRepository: OrdersRepository;
  const user = mockUser();
  const createOrderItemDto: CreateOrderItemDto = {
    productId: 'productId',
    quantity: 5,
  };

  beforeAll(() => {
    const databaseService = new DatabaseService();
    productsRepository = new ProductsRepository(databaseService);
    ordersRepository = new OrdersRepository(databaseService);

    createOrderUseCase = new CreateOrderUseCase(
      productsRepository,
      ordersRepository,
    );

    jest.spyOn(productsRepository, 'findById').mockImplementation(
      () =>
        new Promise((resolve) => {
          const product = new Product();

          product.stock = 5;
          product.price = 5;

          resolve(product);
        }),
    );

    jest
      .spyOn(ordersRepository, 'create')
      .mockImplementation(() => Promise.resolve(new Order()));
  });

  it('Should fail - product does not exists', async () => {
    jest
      .spyOn(productsRepository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(null));

    await expect(
      createOrderUseCase.execute(user, createOrderItemDto),
    ).rejects.toThrow(new ProductNotFoundException());
  });

  it('Should fail - not enough in stock', async () => {
    const reliefDto = structuredClone(createOrderItemDto);
    reliefDto.quantity = 10;

    await expect(createOrderUseCase.execute(user, reliefDto)).rejects.toThrow(
      new NotEnoughInStock(),
    );
  });

  it('Should teste - passing order item', async () => {
    const spy = jest.spyOn(productsRepository, 'findById').mockClear();

    expect(
      await createOrderUseCase.execute(user, createOrderItemDto),
    ).toBeInstanceOf(Order);
    expect(spy).toHaveBeenCalled();
  });

  it('Should succeed - without order item', async () => {
    const reliefDto = {} as CreateOrderItemDto;

    const spy = jest.spyOn(productsRepository, 'findById').mockClear();

    expect(await createOrderUseCase.execute(user, reliefDto)).toBeInstanceOf(
      Order,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
