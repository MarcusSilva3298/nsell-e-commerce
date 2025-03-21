import { instanceToPlain } from 'class-transformer';

export class PresentersUtils {
  static present(data: InstanceType<any>): Record<string, any> {
    return instanceToPlain(data);
  }
}
