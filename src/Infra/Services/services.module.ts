import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from '../Config/ConfigModule/validate';
import { EnviromentService } from './enviroment.service';
import { TokenService } from './token.service';

const services: Provider[] = [TokenService, EnviromentService];

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
