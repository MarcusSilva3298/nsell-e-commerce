import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnviromentService } from '../../App/Ports/Services/IEnviromentService';
import { EnvClass } from '../Config/ConfigModule/schema';

@Injectable()
export class EnviromentService implements IEnviromentService {
  constructor(private readonly configService: ConfigService) {}

  get<K extends keyof EnvClass>(key: K): EnvClass[K] {
    const value = this.configService.get<EnvClass[K]>(key);

    if (value === undefined) {
      throw new InternalServerErrorException(
        `Config key "${key}" is not defined`,
      );
    }

    return value;
  }
}
