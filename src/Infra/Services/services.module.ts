import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from '../Config/ConfigModule/validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: validateEnvVariables,
    }),
  ],
})
export class ServicesModule {}
