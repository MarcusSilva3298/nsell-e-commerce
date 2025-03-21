import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Infra/Database/database.module';
import { ServicesModule } from '../Infra/Services/services.module';
import { authExports, authProviders } from './Providers/AuthUseCasesProviders';
import {
  clientsExports,
  clientsProviders,
} from './Providers/ClientsUseCasesProviders';

@Module({
  imports: [ServicesModule, DatabaseModule],
  providers: [...authProviders, ...clientsProviders],
  exports: [...authExports, ...clientsExports],
})
export class AppModule {}
