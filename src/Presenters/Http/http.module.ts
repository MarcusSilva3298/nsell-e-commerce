import { Module } from '@nestjs/common';
import { AppModule } from '../../App/app.module';
import { DatabaseModule } from '../../Infra/Database/database.module';
import { ServicesModule } from '../../Infra/Services/services.module';
import { AuthController } from './Controllers/auth.controller';
import { HttpController } from './http.controller';

@Module({
  imports: [AppModule, ServicesModule, DatabaseModule],
  controllers: [HttpController, AuthController],
})
export class HttpModule {}
