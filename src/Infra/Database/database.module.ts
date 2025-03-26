import { Module, Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ClientsRepository } from './Repositories/ClientsRepository';
import { OrdersRepository } from './Repositories/OrdersRepository';
import { ProductsRepository } from './Repositories/ProductsRepository';
import { ReportsRepository } from './Repositories/ReportsRepository';
import { UsersRepository } from './Repositories/UserRepository';

const repositories: Provider[] = [
  UsersRepository,
  ClientsRepository,
  ProductsRepository,
  OrdersRepository,
  ReportsRepository,
];

@Module({
  providers: [DatabaseService, ...repositories],
  exports: repositories,
})
export class DatabaseModule {}
