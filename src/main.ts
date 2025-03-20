import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './Presenters/Http/Filters/http-exception.filter';
import { SourceModule } from './source.module';

async function bootstrap() {
  const app = await NestFactory.create(SourceModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
