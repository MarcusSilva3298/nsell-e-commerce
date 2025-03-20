import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IHashService } from '../../App/Ports/Repositories/IHashService';
import { IEnviromentService } from '../../App/Ports/Services/IEnviromentService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';

@Injectable()
export class HashService implements IHashService {
  private readonly saltRounds: string | number;

  constructor(enviromentService: IEnviromentService) {
    this.saltRounds = enviromentService.get(EnvVariablesEnum.HASH_SALT_ROUNDS);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
