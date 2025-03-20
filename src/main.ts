import { NestFactory } from '@nestjs/core';
import { SourceModule } from './source.module';

async function bootstrap() {
  const app = await NestFactory.create(SourceModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
