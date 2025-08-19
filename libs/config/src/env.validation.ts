import { z } from 'zod';

// PORT 會自動轉成 number
// 缺少必填欄位會在啟動時報錯

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  RABBITMQ_URI: z.string().url(),
  POSTGRES_URI: z.string().url(),
});

export type EnvVars = z.infer<typeof envSchema>;
