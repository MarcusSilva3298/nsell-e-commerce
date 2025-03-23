import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Product } from '../../../Domain/Entities/Product';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { SearchProductsQueryDto } from '../../../Domain/Shared/Dtos/Products/SearchProductsQueryDto';
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

    @Inject(ProductsUseCasesEnum.SEARCH)
    private readonly searchProductsUseCase: IUseCase<
      Product[],
      [SearchProductsQueryDto]
    >,

    @Inject(ProductsUseCasesEnum.UPDATE)
    private readonly updateProductsUseCase: IUseCase<
      Product,
      [string, ProductsFactoryDto]
    >,

    @Inject(ProductsUseCasesEnum.DELETE)
    private readonly deleteProductUseCase: IUseCase<Product, [string]>,
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

  @Get()
  search(@Query() queries: SearchProductsQueryDto): Promise<Product[]> {
    return this.searchProductsUseCase.execute(queries);
  }

  @UseGuards(AdminOnly)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: ProductsFactoryDto,
  ): Promise<Product> {
    return this.updateProductsUseCase.execute(id, body);
  }

  @UseGuards(AdminOnly)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.deleteProductUseCase.execute(id);
  }
}
