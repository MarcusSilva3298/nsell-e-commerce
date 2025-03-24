import { Module, Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ClientsRepository } from './Repositories/ClientsRepository';
import { OrdersRepository } from './Repositories/OrdersRepository';
import { ProductsRepository } from './Repositories/ProductsRepository';
import { UsersRepository } from './Repositories/UserRepository';

const repositories: Provider[] = [
  UsersRepository,
  ClientsRepository,
  ProductsRepository,
  OrdersRepository,
];

@Module({
  providers: [DatabaseService, ...repositories],
  exports: repositories,
})
export class DatabaseModule {}
