import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Infra/Database/database.module';
import { ServicesModule } from '../Infra/Services/services.module';
import { authExports, authProviders } from './Providers/AuthUseCasesProviders';

@Module({
  imports: [ServicesModule, DatabaseModule],
  providers: [...authProviders],
  exports: [...authExports],
})
export class AppModule {}
