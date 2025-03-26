import { GenerateReportDto } from '../../../Domain/Shared/Dtos/Report/GenerateReportDto';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { IReportRepository } from '../../Ports/Repositories/IReportRepository';
import { ICsvService } from '../../Ports/Services/ICsvService';

export class GenerateReportUseCase
  implements IUseCase<string, [GenerateReportDto]>
{
  constructor(
    private readonly reportRepository: IReportRepository,
    private readonly csvService: ICsvService,
  ) {}

  async execute(queries: GenerateReportDto): Promise<string> {
    const report = await this.reportRepository.generateReport(queries);

    return await this.csvService.generateCsv(report);
  }
}
