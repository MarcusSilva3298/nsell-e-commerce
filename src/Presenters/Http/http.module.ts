import { Module } from '@nestjs/common';
import { AppModule } from '../../App/app.module';
import { AuthController } from './Controllers/auth.controller';
import { HttpController } from './http.controller';

@Module({
  imports: [AppModule],
  controllers: [HttpController, AuthController],
})
export class HttpModule {}
