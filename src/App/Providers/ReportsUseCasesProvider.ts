import { Provider } from '@nestjs/common';
import { ReportsUseCasesEnum } from '../../Domain/Shared/Enums/ReportsUseCasesEnum';
import { ReportsRepository } from '../../Infra/Database/Repositories/ReportsRepository';
import { CsvService } from '../../Infra/Services/csv.service';
import { IReportRepository } from '../Ports/Repositories/IReportRepository';
import { ICsvService } from '../Ports/Services/ICsvService';
import { GenerateReportUseCase } from '../UseCases/Reports/GenerateReportUseCase';

export const reportsExports: string[] = Object.values(ReportsUseCasesEnum);

export const reportsProviders: Provider[] = [
  {
    provide: ReportsUseCasesEnum.GENERATE,
    inject: [ReportsRepository, CsvService],
    useFactory: (
      reportsRepository: IReportRepository,
      csvService: ICsvService,
    ) => new GenerateReportUseCase(reportsRepository, csvService),
  },
];
