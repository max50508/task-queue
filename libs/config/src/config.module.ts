import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as path from 'path';
import { ConfigAppService } from './config.service';
import { envSchema } from './env.validation';

const appName = process.env.NEST_APP_NAME;
const specificEnv = appName
  ? path.resolve(process.cwd(), `apps/${appName}/.env.${appName}`)
  : null;

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      // ✅ 專屬優先，共用其次
      envFilePath: [specificEnv, path.resolve(process.cwd(), '.env')].filter(
        Boolean,
      ) as string[],
      // Zod 驗證
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          // 這裡直接丟出錯誤即可，Nest 會中止啟動
          throw new Error(
            'Invalid environment variables:\n' +
              JSON.stringify(parsed.error.format(), null, 2),
          );
        }
        return parsed.data;
      },
    }),
  ],
  providers: [ConfigAppService],
  exports: [ConfigAppService], // 導出自家 service
})
export class ConfigAppModule {}
