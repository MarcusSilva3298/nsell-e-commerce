import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { validateEnvVariables } from '../Config/ConfigModule/validate';
import { CsvService } from './csv.service';
import { EnviromentService } from './enviroment.service';
import { HashService } from './hash.service';
import { MailService } from './mail.service';
import { PaymentService } from './payment.service';
import { TokenService } from './token.service';

const services: Provider[] = [
  EnviromentService,
  HashService,
  TokenService,
  PaymentService,
  CsvService,
  MailService,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: validateEnvVariables,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confiService: ConfigService) => ({
        transport: {
          host: confiService.get(EnvVariablesEnum.MAILTRAP_HOST),
          port: confiService.get(EnvVariablesEnum.MAILTRAP_PORT),
          auth: {
            user: confiService.get(EnvVariablesEnum.MAILTRAP_AUTH_USER),
            pass: confiService.get(EnvVariablesEnum.MAILTRAP_AUTH_PASS),
          },
        },
        template: {
          dir: join(__dirname, '..', '..', '..', '..', 'views'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: services,
  exports: services,
})
export class ServicesModule {}
