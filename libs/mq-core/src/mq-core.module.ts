import { ConfigAppModule, ConfigAppService } from '@app/config';
import { EXCHANGE } from '@app/contracts/constants/rabbit.constants';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MqPublisher } from './mq.publisher';

@Module({
  imports: [
    ConfigAppModule, // 導入 ConfigAppModule 以提供 ConfigAppService（用於其他用途，如：MqPublisher中使用）
    RabbitMQModule.forRootAsync({
      imports: [ConfigAppModule], // 在動態模組中也需要導入 ConfigAppModule，讓動態模組能在自己的上下文中訪問 ConfigAppService
      inject: [ConfigAppService],
      useFactory: (cfg: ConfigAppService) => ({
        uri: cfg.getRabbitUri(),
        exchanges: [{ name: EXCHANGE, type: 'topic' }],
        connectionInitOptions: { wait: true, timeout: 5000 }, //wait: true 表示等待連線成功才啟動 Nest 應用，timeout 設定最長等待時間（毫秒）
      }),
    }),
  ],
  providers: [MqPublisher],
  exports: [MqPublisher],
})
export class MqCoreModule {}
