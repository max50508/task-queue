// src/mock/mock.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { ZodTypeAny } from 'zod';
import { MockGeneratorService } from './mock-generator.service';
import { MOCK_SCHEMA_KEY } from './mock-schema.decorator';

@Injectable()
export class MockInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly mockGenerator: MockGeneratorService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (process.env.MOCK_MODE !== 'true') {
      return next.handle();
    }

    const handler = context.getHandler();
    const schema = this.reflector.get<ZodTypeAny>(MOCK_SCHEMA_KEY, handler);

    if (!schema) {
      return next.handle();
    }

    const mockData = this.mockGenerator.generateFromSchema(schema);
    return of(mockData);
  }
}
