import { NestFactory } from '@nestjs/core';
import { AdminApiModule } from './admin-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminApiModule);
  const port = process.env.PORT ?? 3000;
  console.log(`Starting Admin API on port ${port}...`);
  await app.listen(port);
}
bootstrap();
