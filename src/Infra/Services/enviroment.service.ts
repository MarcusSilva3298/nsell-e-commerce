import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvClass } from '../Config/ConfigModule/schema';

@Injectable()
export class EnviromentService {
  constructor(private readonly configService: ConfigService) {}

  get<K extends keyof EnvClass>(key: K): EnvClass[K] {
    const value = this.configService.get<EnvClass[K]>(key);

    if (value === undefined) {
      throw new Error(`Config key "${key}" is not defined`);
    }

    return value;
  }
}
