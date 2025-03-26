import { Controller, Get, Inject, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, unlink } from 'fs';
import { GenerateReportDto } from '../../../Domain/Shared/Dtos/Report/GenerateReportDto';
import { ReportsUseCasesEnum } from '../../../Domain/Shared/Enums/ReportsUseCasesEnum';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { AdminOnly } from '../Guards/admin-only.guard';
import { AuthGuard } from '../Guards/auth.guard';

@UseGuards(AuthGuard, AdminOnly)
@Controller('reports')
export class ReportsController {
  constructor(
    @Inject(ReportsUseCasesEnum.GENERATE)
    private readonly generateReportUseCase: IUseCase<any, [GenerateReportDto]>,
  ) {}

  @Get()
  async generate(
    @Query() queries: GenerateReportDto,
    @Res() response: Response,
  ): Promise<void> {
    const filePath = await this.generateReportUseCase.execute(queries);

    response.setHeader(
      'Content-Disposition',
      `attachment; filename="report.csv"`,
    );
    response.setHeader('Content-Type', 'text/csv');

    const fileStream = createReadStream(filePath);
    fileStream.pipe(response);
    fileStream.on('end', () => {
      unlink(filePath, (err) => {
        if (err) {
          console.error('Erro ao deletar arquivo:', err);
        }
      });
    });
  }
}
