import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';
import { UserTypeEnum } from '../../../Domain/Shared/Enums/UserTypeEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IOrdersRepository } from '../../Ports/Repositories/IOrdersRepository';

export class SearchOrdersUseCase
  implements IUseCase<Order[], [User, SearchOrdersQueryDto]>
{
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(user: User, queries: SearchOrdersQueryDto): Promise<Order[]> {
    let clientId: string | undefined;

    if (user.type !== UserTypeEnum.ADMIN) clientId = user.Client!.id;

    return await this.ordersRepository.search(queries, clientId);
  }
}
