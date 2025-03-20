export interface IHashService {
  hashPassword(password: string): Promise<string>;
  compareHash(password: string, hash: string): Promise<boolean>;
}
