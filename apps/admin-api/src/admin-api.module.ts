import { ConfigAppModule } from '@app/config';
import { MqCoreModule } from '@app/mq-core';
import { Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';
import { MockModule } from './mock/mock.module';

@Module({
  imports: [ConfigAppModule, MqCoreModule, MockModule],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
