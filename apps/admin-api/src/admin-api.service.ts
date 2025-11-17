import { ConfigAppService } from '@app/config';
import { BaseTaskType, EnqueueEmailDto, TaskEnum } from '@app/contracts';
import {
  EXCHANGE,
  RoutingKey,
} from '@app/contracts/constants/rabbit.constants';
import { MqPublisher } from '@app/mq-core';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AdminApiService {
  constructor(
    private readonly configService: ConfigAppService,
    private readonly mqPublisher: MqPublisher,
  ) {}

  getHealth() {
    return {
      ok: true,
      env: this.configService.getNodeEnv(),
      port: this.configService.getPort(),
      rabbit: this.configService.getRabbitUri(),
      now: new Date().toISOString(),
    };
  }

  getHello(): string {
    return 'Hello World!';
  }

  async enqueueEmail(dto: EnqueueEmailDto): Promise<{ jobId: string }> {
    const idempotencyKey = randomUUID();
    const msg: BaseTaskType<EnqueueEmailDto> = {
      id: idempotencyKey,
      type: TaskEnum.EMAIL_SEND,
      payload: dto,
      idempotencyKey,
      createdAt: new Date().toISOString(),
    };
    await this.mqPublisher.mqPublish(EXCHANGE, RoutingKey.EMAIL_SEND, msg, {
      messageId: idempotencyKey,
      persistent: true,
      headers: { 'x-idempotency-key': idempotencyKey },
    });
    return { jobId: msg.id };
  }
}
