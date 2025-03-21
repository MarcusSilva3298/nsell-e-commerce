import { Client } from '../../Entities/Client';

export interface ISignUpResponse {
  accessToken: string;
  refreshToken: string;
  client: Partial<Client>;
}
