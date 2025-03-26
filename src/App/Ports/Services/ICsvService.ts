export interface ICsvService {
  generateCsv(data: any): Promise<string>;
}
