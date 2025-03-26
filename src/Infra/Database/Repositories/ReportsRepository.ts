import { Injectable } from '@nestjs/common';
import { GenerateReportDto } from '../../../Domain/Shared/Dtos/Report/GenerateReportDto';
import { OrderStatusValuesEnum } from '../../../Domain/Shared/Enums/OrderStatusValuesEnum';
import { DatabaseService } from '../database.service';

@Injectable()
export class ReportsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateReport(queries: GenerateReportDto) {
    const params: any[] = [
      queries.status || OrderStatusValuesEnum.DELIVERED,
      new Date(queries.startDate),
      new Date(queries.endDate),
    ];

    let query = `
        SELECT 
            p.name AS product,
            SUM(oi.quantity) AS amount,
            SUM(oi.quantity * p.price) AS profit
        FROM 
            "OrderItem" oi
        INNER JOIN 
            "Product" p ON oi."productId" = p.id
        INNER JOIN 
            "Order" o ON oi."orderId"  = o.id
        WHERE 
            o."deletedAt" IS NULL
            AND o."orderStatusValue" = $1
            AND o."updatedAt" BETWEEN $2 AND $3
    `;

    if (queries.productName) {
      query += ` AND p.name ILIKE $4`;
      params.push(`%${queries.productName}%`);
    }

    query += ` GROUP BY p.id, p.name ORDER BY Profit DESC;`;

    console.log(params, query);

    return await this.databaseService.$queryRawUnsafe(query, ...params);
  }
}
