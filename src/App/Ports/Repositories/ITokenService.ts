import { IPayload } from '../../../Domain/Shared/Interfaces/IPayload';

export interface ITokenService {
  signAccess(payload: IPayload): string;
  verifiyAccess(token: string): IPayload;

  signRefresh(payload: IPayload): string;
  verifiyRefresh(token: string): IPayload;
}
