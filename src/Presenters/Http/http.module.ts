import { Module } from '@nestjs/common';
import { AppModule } from '../../App/app.module';
import { DatabaseModule } from '../../Infra/Database/database.module';
import { ServicesModule } from '../../Infra/Services/services.module';
import { AuthController } from './Controllers/auth.controller';
import { ClientsController } from './Controllers/clients.controller';
import { OrdersController } from './Controllers/orders.controller';
import { ProductsController } from './Controllers/products.controller';
import { HttpController } from './http.controller';

@Module({
  imports: [AppModule, ServicesModule, DatabaseModule],
  controllers: [
    HttpController,
    AuthController,
    ClientsController,
    ProductsController,
    OrdersController,
  ],
})
export class HttpModule {}
