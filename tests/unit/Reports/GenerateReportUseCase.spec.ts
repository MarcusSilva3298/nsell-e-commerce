import { GenerateReportUseCase } from '../../../src/App/UseCases/Reports/GenerateReportUseCase';
import { GenerateReportDto } from '../../../src/Domain/Shared/Dtos/Report/GenerateReportDto';
import { DatabaseService } from '../../../src/Infra/Database/database.service';
import { ReportsRepository } from '../../../src/Infra/Database/Repositories/ReportsRepository';
import { CsvService } from '../../../src/Infra/Services/csv.service';

describe('Reports Module - Generate Report', () => {
  let generateReportUseCase: GenerateReportUseCase;
  let reportRepository: ReportsRepository;
  let cvsService: CsvService;
  const queries: GenerateReportDto = new GenerateReportDto();

  beforeAll(() => {
    const databaseService = new DatabaseService();
    reportRepository = new ReportsRepository(databaseService);

    cvsService = new CsvService();

    generateReportUseCase = new GenerateReportUseCase(
      reportRepository,
      cvsService,
    );

    jest
      .spyOn(reportRepository, 'generateReport')
      .mockImplementation(() => Promise.resolve({}));

    jest
      .spyOn(cvsService, 'generateCsv')
      .mockImplementation(() => Promise.resolve('filepath'));
  });

  it('Should succeed', async () => {
    expect(await generateReportUseCase.execute(queries)).toEqual(
      expect.any(String),
    );
  });
});
