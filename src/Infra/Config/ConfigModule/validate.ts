import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { EnvClass } from './schema';

export async function validateEnvVariables(
  options: Record<string, any>,
): Promise<EnvClass> {
  const parsedOptions = plainToClass(EnvClass, options, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const results = await validate(parsedOptions);

  if (results.length > 0) {
    results.forEach((error) => {
      for (const constraint in error.constraints) {
        Logger.error(error.constraints[constraint], 'ENV VARIABLES ERROR');
      }
    });
    Logger.fatal('Terminating the server');
    process.exit(1);
  }

  return parsedOptions;
}
