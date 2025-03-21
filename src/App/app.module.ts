import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Infra/Database/database.module';
import { ServicesModule } from '../Infra/Services/services.module';
import { authExports, authProviders } from './Providers/AuthUseCasesProviders';
import {
  clientsExports,
  clientsProviders,
} from './Providers/ClientsUseCasesProviders';
import {
  productsExports,
  productsProviders,
} from './Providers/ProductsUseCasesProviders';

@Module({
  imports: [ServicesModule, DatabaseModule],
  providers: [...authProviders, ...clientsProviders, ...productsProviders],
  exports: [...authExports, ...clientsExports, ...productsExports],
})
export class AppModule {}
