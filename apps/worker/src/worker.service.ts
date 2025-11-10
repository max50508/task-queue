import { ConfigAppService } from '@app/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
@Injectable()
export class WorkerService implements OnModuleInit {
  private readonly logger = new Logger(WorkerService.name);
  constructor(private readonly cfg: ConfigAppService) {}

  onModuleInit() {
    this.logger.log(`Worker ready. (mock)`);
    this.logger.log(`RabbitMQ: ${this.cfg.getRabbitUri()}`);
    // 這裡接上你的 Rabbit 消費者初始化...
  }
}
