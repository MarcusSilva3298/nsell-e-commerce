import { Module, Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ClientsRepository } from './Repositories/ClientsRepository';
import { UsersRepository } from './Repositories/UserRepository';

const repositories: Provider[] = [UsersRepository, ClientsRepository];

@Module({
  providers: [DatabaseService, ...repositories],
  exports: repositories,
})
export class DatabaseModule {}
