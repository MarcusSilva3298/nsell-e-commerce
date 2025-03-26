import { Injectable } from '@nestjs/common';
import * as fastCsv from 'fast-csv';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ICsvService } from '../../App/Ports/Services/ICsvService';

@Injectable()
export class CsvService implements ICsvService {
  private readonly csvFolder = join(__dirname, '..', '..', '..', '..', 'tmp');

  constructor() {
    if (!existsSync(this.csvFolder)) {
      mkdirSync(this.csvFolder, { recursive: true });
    }
  }

  async generateCsv(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = join(this.csvFolder, `report-${Date.now()}.csv`);
      const ws = createWriteStream(filePath);

      fastCsv
        .write(data, { headers: true })
        .on('finish', () => resolve(filePath))
        .on('error', (err) => reject(err))
        .pipe(ws);
    });
  }
}
