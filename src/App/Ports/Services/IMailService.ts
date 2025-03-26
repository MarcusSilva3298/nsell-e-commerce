import { ISendVerifyEmail } from '../../../Domain/Shared/Interfaces/ISendVerifyEmail';

export interface IMailService {
  sendVerifyEmail(to: string, context: ISendVerifyEmail): void;
}
