import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MockGeneratorService } from './mock-generator.service';
import { MockInterceptor } from './mock.interceptor';

@Module({
  providers: [
    MockGeneratorService,
    {
      provide: APP_INTERCEPTOR, // 全域攔截器token，使用了將會自動註冊成全域攔截器，不需要額外設定
      useClass: MockInterceptor,
    },
  ],
})
export class MockModule {}
