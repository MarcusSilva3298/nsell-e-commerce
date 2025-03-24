import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Order } from '../../../Domain/Entities/Order';
import { User } from '../../../Domain/Entities/User';
import { CreateOrderItemDto } from '../../../Domain/Shared/Dtos/Orders/CreateOrderItemDto';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';
import { OrdersUseCasesEnum } from '../../../Domain/Shared/Enums/OrdersUseCasesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { GetUser } from '../Decorators/get-user.decorator';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/orders')
export class OrdersController {
  constructor(
    @Inject(OrdersUseCasesEnum.CREATE)
    private readonly createOrderUseCase: IUseCase<
      Order,
      [User, CreateOrderItemDto]
    >,

    @Inject(OrdersUseCasesEnum.READ)
    private readonly readOrderUseCase: IUseCase<Order, [string, User]>,

    @Inject(OrdersUseCasesEnum.SEARCH)
    private readonly searchOrdersUseCase: IUseCase<
      Order[],
      [SearchOrdersQueryDto]
    >,

    @Inject(OrdersUseCasesEnum.DELETE)
    private readonly deleteOrderUseCase: IUseCase<Order, [string]>,
  ) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() body: CreateOrderItemDto,
  ): Promise<Order> {
    return this.createOrderUseCase.execute(user, body);
  }

  @Get(':id')
  read(@Param('id') id: string, @GetUser() user: User): Promise<Order> {
    return this.readOrderUseCase.execute(id, user);
  }

  @Get()
  search(@Query() queries: SearchOrdersQueryDto): Promise<Order[]> {
    return this.searchOrdersUseCase.execute(queries);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Order> {
    return this.deleteOrderUseCase.execute(id);
  }
}
