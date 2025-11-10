import { ConfigAppService } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminApiModule } from './admin-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminApiModule);

  // swagger api doc
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Queue Admin API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, doc);

  const cfg = app.get(ConfigAppService);
  const port = cfg.get('PORT');
  console.log(`Starting Admin API on port ${port}...`);
  await app.listen(port);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
