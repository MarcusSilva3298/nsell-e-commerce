import { GenerateReportDto } from '../../../Domain/Shared/Dtos/Report/GenerateReportDto';

export interface IReportRepository {
  generateReport(queries: GenerateReportDto): Promise<any>;
}
