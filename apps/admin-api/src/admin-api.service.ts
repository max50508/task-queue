import { ConfigAppService } from '@app/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminApiService {
  constructor(private readonly configService: ConfigAppService) {}

  health() {
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
}
