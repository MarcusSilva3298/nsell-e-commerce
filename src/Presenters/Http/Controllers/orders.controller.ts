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
import { CreateOrderItemDto } from '../../../Domain/Shared/Dtos/Orders/CreateOrderItemDto';
import { SearchOrdersQueryDto } from '../../../Domain/Shared/Dtos/Orders/SearchOrdersQueryDto';
import { OrdersUseCasesEnum } from '../../../Domain/Shared/Enums/OrdersUseCasesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/oders')
export class OrdersController {
  constructor(
    @Inject(OrdersUseCasesEnum.CREATE)
    private readonly createOrderUseCase: IUseCase<Order, [CreateOrderItemDto]>,

    @Inject(OrdersUseCasesEnum.READ)
    private readonly readOrderUseCase: IUseCase<Order, [string]>,

    @Inject(OrdersUseCasesEnum.SEARCH)
    private readonly searchOrdersUseCase: IUseCase<
      Order[],
      [SearchOrdersQueryDto]
    >,

    @Inject(OrdersUseCasesEnum.DELETE)
    private readonly deleteOrderUseCase: IUseCase<Order, [string]>,
  ) {}

  @Post()
  signIn(@Body() body: CreateOrderItemDto): Promise<Order> {
    return this.createOrderUseCase.execute(body);
  }

  @Get(':id')
  read(@Param('id') id: string): Promise<Order> {
    return this.readOrderUseCase.execute(id);
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
