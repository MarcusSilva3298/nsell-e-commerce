import { Controller, Get } from '@nestjs/common';

@Controller()
export class HttpController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Serviço Online!';
  }
}
