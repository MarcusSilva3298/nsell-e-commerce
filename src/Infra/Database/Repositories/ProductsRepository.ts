import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
import { IProductRepository } from '../../../App/Ports/Repositories/IProductsRepository';
import { OrderItem } from '../../../Domain/Entities/OrderItem';
import { Product } from '../../../Domain/Entities/Product';
import { Tag } from '../../../Domain/Entities/Tag';
import { ProductsFactoryDto } from '../../../Domain/Shared/Dtos/Products/ProductsFactoryDto';
import { SearchProductsQueryDto } from '../../../Domain/Shared/Dtos/Products/SearchProductsQueryDto';
import { TagsFactoryDto } from '../../../Domain/Shared/Dtos/Products/TagsFactoryDto';
import { DatabaseService } from '../database.service';

interface IConnectDisconnectTags {
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

  private createConnectAndDisconnectTags(
    newTags: TagsFactoryDto[],
    existingTags?: Tag[],
  ): {
    connect: IConnectDisconnectTags[];
    create: ICreateTags[];
    disconnect: IConnectDisconnectTags[];
  } {
    const connect: IConnectDisconnectTags[] = [];
    const create: { id: string; value: string; label: string }[] = [];
    const disconnect: IConnectDisconnectTags[] = [];

    newTags.forEach((item) => {
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

    if (existingTags?.length) {
      const newTagIds = new Set(newTags.map((tag) => tag.id).filter(Boolean));

      existingTags.forEach((tag) => {
        if (!newTagIds.has(tag.id)) {
          disconnect.push({ id: tag.id });
        }
      });
    }

    return { connect, create, disconnect };
  }

  async validateTags(tags: TagsFactoryDto[]): Promise<boolean> {
    const queries: any[] = [];

    tags.forEach((tag) => {
      if (tag.id) {
        const query = this.database.tag.findUnique({
          where: { id: tag.id, deletedAt: null },
        });
        queries.push(query);
      }
    });

    const results = await this.database.$transaction(queries);

    return results.every((result) => result !== null);
  }

  async create(body: ProductsFactoryDto): Promise<Product> {
    const { create, connect } = this.createConnectAndDisconnectTags(body.Tags);

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

  async update(
    id: string,
    body: ProductsFactoryDto,
    existingTags: Tag[],
  ): Promise<Product> {
    const { create, connect, disconnect } = this.createConnectAndDisconnectTags(
      body.Tags,
      existingTags,
    );

    return this.database.product.update({
      where: { id },
      include: { Tags: true },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        Tags: { connect, create, disconnect },
      },
    });
  }

  async validateStock(items: OrderItem[]): Promise<boolean> {
    const operations = items.map((item) =>
      this.database.product.findUnique({
        where: { id: item.productId, stock: { gte: item.quantity } },
      }),
    );

    const results = await this.database.$transaction(operations);

    return results.every((result) => result !== null);
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
            ? filters.inStock === 'true'
              ? { stock: { gt: 0 } }
              : { stock: 0 }
            : {},
          filters.tags
            ? { Tags: { some: { value: { in: filters.tags.split(',') } } } }
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
