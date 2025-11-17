import { GetHelloDtoSchema } from '@app/contracts/dto/hello/get.hello.dto';
import { Controller, Get } from '@nestjs/common';
import { AdminApiService } from './admin-api.service';
import { MockSchema } from './mock/mock-schema.decorator';

@Controller()
export class AdminApiController {
  constructor(private readonly adminApiService: AdminApiService) {}

  @Get()
  @MockSchema(GetHelloDtoSchema)
  getHello(): string {
    return this.adminApiService.getHello();
  }

  @Get('health')
  getHealth() {
    return this.adminApiService.getHealth();
  }
}
