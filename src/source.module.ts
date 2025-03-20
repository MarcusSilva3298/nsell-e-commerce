import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { validateEnvVariables } from './Infra/Config/configModule/validate';
import { HttpModule } from './Presenters/Http/http.module';

@Module({
  imports: [
    HttpModule,
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    //   isGlobal: true,
    //   validate: validateEnvVariables,
    // }),
  ],
})
export class SoruceModule {}
