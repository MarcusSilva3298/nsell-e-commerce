import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Product } from '../../../Domain/Entities/Product';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { ProductsUseCasesEnum } from '../../../Domain/Shared/Enums/ProductsUseCasesenum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { AdminOnly } from '../Guards/admin-only.guard';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/products')
export class ProductsController {
  constructor(
    @Inject(ProductsUseCasesEnum.CREATE)
    private readonly createProductUseCase: IUseCase<
      Product,
      [ProductsFactoryDto]
    >,

    @Inject(ProductsUseCasesEnum.READ)
    private readonly readProductUseCase: IUseCase<Product, [string]>,
  ) {}

  @UseGuards(AdminOnly)
  @Post()
  create(@Body() body: ProductsFactoryDto): Promise<Product> {
    return this.createProductUseCase.execute(body);
  }

  @Get(':id')
  read(@Param('id') id: string): Promise<Product> {
    return this.readProductUseCase.execute(id);
  }
}
