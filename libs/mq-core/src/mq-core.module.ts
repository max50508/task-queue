import { ConfigAppService } from '@app/config';
import { EXCHANGE } from '@app/contracts/constants/rabbit.constants';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MqPublisher } from './mq.publisher';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
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
