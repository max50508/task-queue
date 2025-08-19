import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './env.validation';

@Injectable()
export class ConfigAppService {
  constructor(private readonly config: ConfigService<EnvVars, true>) {}

  // 基礎：可用於少量動態 key 的情境（型別安全）
  get<K extends keyof EnvVars>(key: K) {
    return this.config.get(key, { infer: true });
  }

  // 推薦：領域明確的方法（避免魔法字串）
  getNodeEnv() {
    return this.config.get('NODE_ENV', { infer: true });
  }

  getPort() {
    return this.config.get('PORT', { infer: true });
  }

  getRabbitUri() {
    return this.config.get('RABBITMQ_URI', { infer: true });
  }

  getPostgresUri() {
    return this.config.get('POSTGRES_URI', { infer: true });
  }

  // 進階：提供「必要值」的取法，缺少就丟錯（避免啟動後才炸）
  must<K extends keyof EnvVars>(key: K): NonNullable<EnvVars[K]> {
    const v = this.config.get(key, { infer: true });
    if (
      v === undefined ||
      v === null ||
      (typeof v === 'string' && v.length === 0)
    ) {
      throw new Error(`Missing required env: ${String(key)}`);
    }
    return v as NonNullable<EnvVars[K]>;
  }

  // 也可以提供聚合型設定（例如分解資料庫連線資訊、Rabbit options 等）
  asRabbitOptions() {
    const uri = this.must('RABBITMQ_URI');
    return { uri, exchanges: [{ name: 'tasks.x', type: 'topic' as const }] };
  }
}
