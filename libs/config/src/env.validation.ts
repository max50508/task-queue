import { z } from 'zod';

// PORT 會自動轉成 number
// 缺少必填欄位會在啟動時報錯

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  MOCK_MODE: z.coerce.boolean().default(false), // 使用 coerce 將字串 "true"/"false" 轉換為 boolean
  PORT: z.coerce.number().default(3000),
  RABBITMQ_URI: z.url('RabbitMQ URI is required'),
  POSTGRES_URI: z.url('PostgreSQL URI is required'),
});

export type EnvVars = z.infer<typeof envSchema>;
