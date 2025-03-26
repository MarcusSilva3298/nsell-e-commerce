import { User } from '../../../Domain/Entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  confirmEmail(id: string): Promise<User>;
}
