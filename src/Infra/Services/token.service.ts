import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { ITokenService } from '../../App/Ports/Services/ITokenService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { IPayload } from '../../Domain/Shared/Interfaces/IPayload';
import { EnviromentService } from './enviroment.service';

@Injectable()
export class TokenService implements ITokenService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: number;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: number;

  constructor(enviromentService: EnviromentService) {
    this.accessSecret = enviromentService.get(EnvVariablesEnum.TOKEN_SECRET);
    this.accessExpiresIn = enviromentService.get(
      EnvVariablesEnum.TOKEN_EXPIRES_IN,
    );

    this.refreshSecret = enviromentService.get(EnvVariablesEnum.REFRESH_SECRET);
    this.refreshExpiresIn = enviromentService.get(
      EnvVariablesEnum.REFRESH_EXPIRES_IN,
    );
  }

  private sign(
    payload: IPayload,
    secret: string,
    options?: SignOptions,
  ): string {
    try {
      return sign(payload, secret, options);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Failed to generate token');
    }
  }

  private verifiy(
    token: string,
    secret: string,
    options?: VerifyOptions,
  ): IPayload {
    try {
      return verify(token, secret, options) as IPayload;
    } catch (error) {
      if (error.message === 'jwt malformed')
        throw new UnauthorizedException('Invalid token');

      if (error.message === 'jwt expired')
        throw new UnauthorizedException('Invalid token');

      throw new InternalServerErrorException(error, 'Faile to verify token');
    }
  }

  signAccess(payload: IPayload): string {
    return this.sign(payload, this.accessSecret, {
      expiresIn: `${this.accessExpiresIn}d`,
    });
  }

  verifiyAccess(token: string): IPayload {
    return this.verifiy(token, this.accessSecret);
  }

  signRefresh(payload: IPayload): string {
    return this.sign(payload, this.refreshSecret, {
      expiresIn: `${this.refreshExpiresIn}d`,
    });
  }

  verifiyRefresh(token: string): IPayload {
    return this.verifiy(token, this.refreshSecret);
  }
}
