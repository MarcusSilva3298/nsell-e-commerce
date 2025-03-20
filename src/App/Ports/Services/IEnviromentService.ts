import { EnvClass } from '../../../Infra/Config/ConfigModule/schema';

export interface IEnviromentService {
  get<K extends keyof EnvClass>(key: K): EnvClass[K];
}
