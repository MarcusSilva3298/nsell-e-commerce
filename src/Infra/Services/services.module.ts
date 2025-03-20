import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from '../Config/ConfigModule/validate';
import { EnviromentService } from './enviroment.service';
import { HashService } from './hash.service';
import { TokenService } from './token.service';

const services: Provider[] = [EnviromentService, HashService, TokenService];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: validateEnvVariables,
    }),
  ],
  providers: services,
  exports: services,
})
export class ServicesModule {}
