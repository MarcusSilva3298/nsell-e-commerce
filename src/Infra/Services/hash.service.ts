import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IHashService } from '../../App/Ports/Repositories/IHashService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { EnviromentService } from './enviroment.service';

@Injectable()
export class HashService implements IHashService {
  private readonly hashRounds: number;

  constructor(enviromentService: EnviromentService) {
    const hashRounds = enviromentService.get(EnvVariablesEnum.HASH_ROUNDS);
    this.hashRounds = Number(hashRounds);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.hashRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
