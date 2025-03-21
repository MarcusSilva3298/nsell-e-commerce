import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
import { IProductRepository } from '../../../App/Ports/Repositories/IProductsRepository';
import { Product } from '../../../Domain/Entities/Product';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { SearchProductsQueryDto } from '../../../Domain/Shared/Dtos/Products/SearchProductsQueryDto';
import { TagsFactoryDto } from '../../../Domain/Shared/Dtos/Products/TagsFactoryDto';
import { DatabaseService } from '../database.service';

interface IConnectTags {
  id: string;
}

interface ICreateTags {
  id: string;
  value: string;
  label: string;
}

@Injectable()
export class ProductsRepository implements IProductRepository {
  constructor(private readonly database: DatabaseService) {}

  private createOrConnectTags(tags: TagsFactoryDto[]): {
    connect: IConnectTags[];
    create: ICreateTags[];
  } {
    const connect: IConnectTags[] = [];
    const create: { id: string; value: string; label: string }[] = [];

    tags.forEach((item) => {
      if (item.id) {
        connect.push({ id: item.id });
      } else {
        create.push({
          id: v7(),
          value: item.value!,
          label: item.label!,
        });
      }
    });

    return { connect, create };
  }

  async create(body: ProductsFactoryDto): Promise<Product> {
    const { create, connect } = this.createOrConnectTags(body.Tags);

    return this.database.product.create({
      include: { Tags: true },
      data: {
        id: v7(),
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        Tags: { connect, create },
      },
    });
  }

  async update(id: string, body: ProductsFactoryDto): Promise<Product> {
    const { create, connect } = this.createOrConnectTags(body.Tags);

    return this.database.product.update({
      where: { id },
      include: { Tags: true },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        Tags: { connect, create },
      },
    });
  }

  async delete(id: string): Promise<Product> {
    return this.database.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return await this.database.product.findUnique({
      include: { Tags: true },
      where: { id },
    });
  }

  async search(filters: SearchProductsQueryDto): Promise<Product[]> {
    return await this.database.product.findMany({
      include: { Tags: true },
      where: {
        AND: [
          { deletedAt: null },
          filters.inStock
            ? filters.inStock === true
              ? { stock: { gt: 0 } }
              : { stock: 0 }
            : {},
          filters.tags
            ? { Tags: { some: { value: { in: filters.tags } } } }
            : {},
          filters.query
            ? {
                OR: [
                  { name: { contains: filters.query, mode: 'insensitive' } },
                  {
                    description: {
                      contains: filters.query,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {},
        ],
      },
    });
  }
}
