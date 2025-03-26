import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from '../Config/ConfigModule/validate';
import { CsvService } from './csv.service';
import { EnviromentService } from './enviroment.service';
import { HashService } from './hash.service';
import { PaymentService } from './payment.service';
import { TokenService } from './token.service';

const services: Provider[] = [
  EnviromentService,
  HashService,
  TokenService,
  PaymentService,
  CsvService,
];

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
