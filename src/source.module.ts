import { Module } from '@nestjs/common';
import { HttpModule } from './Presenters/Http/http.module';

@Module({
  imports: [HttpModule],
})
export class SourceModule {}
