import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const MOCK_SCHEMA_KEY = 'mock:schema';

export const MockSchema = (schema: z.ZodType<unknown>): MethodDecorator =>
  SetMetadata(MOCK_SCHEMA_KEY, schema);
