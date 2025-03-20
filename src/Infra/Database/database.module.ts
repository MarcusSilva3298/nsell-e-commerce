import { Module, Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersRepository } from './Repositories/UserRepository';

const repositories: Provider[] = [UsersRepository];

@Module({
  providers: [DatabaseService, ...repositories],
  exports: repositories,
})
export class DatabaseModule {}
