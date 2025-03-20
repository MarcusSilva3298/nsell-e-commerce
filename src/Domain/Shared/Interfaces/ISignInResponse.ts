import { User } from 'src/Domain/Entities/User';

export interface ISignResponse {
  accessToken: string;
  refreshToken: string;
  user: Partial<User>;
}
