import { ConfigAppModule } from '@app/config';
import { Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';

@Module({
  imports: [ConfigAppModule],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
