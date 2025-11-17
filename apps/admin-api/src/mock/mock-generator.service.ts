import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class MockGeneratorService {
  generateFromSchema<T = unknown>(schema: z.ZodType<unknown>): T {
    return this.mockBySchema(schema) as T;
  }

  private mockBySchema(schema: z.ZodType<unknown>): unknown {
    // ---- string 類 ----
    if (schema instanceof z.ZodString) {
      const checks =
        ((schema._def as any).checks as Array<{ kind: string }> | undefined) ??
        [];
      const special: { kind: string } | undefined = checks[0];

      if (special) {
        switch (special.kind) {
          case 'email':
            return faker.internet.email();
          case 'url':
            return faker.internet.url();
          case 'uuid':
          case 'cuid':
          case 'cuid2':
          case 'ulid':
          case 'nanoid':
            return faker.string.uuid();
          case 'emoji':
            return faker.internet.emoji();
          default:
            break;
        }
      }

      // 如果欄位名有 hint，也可以用來決定內容
      // （這裡示範：在 ZodObject 裡再特別處理）
      return faker.lorem.word();
    }

    // ---- number 類 ----
    if (schema instanceof z.ZodNumber) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const def = schema._def as any;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const min: number = def.minValue ?? 0;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const max: number = def.maxValue ?? 10000;
      return faker.number.int({ min, max });
    }

    // ---- boolean ----
    if (schema instanceof z.ZodBoolean) {
      return faker.datatype.boolean();
    }

    // ---- date ----
    if (schema instanceof z.ZodDate) {
      return faker.date.recent();
    }

    // ---- object ----
    if (schema instanceof z.ZodObject) {
      const shape = schema.shape;
      const obj: Record<string, unknown> = {};
      for (const key of Object.keys(shape)) {
        const subSchema = shape[key] as z.ZodType<unknown>;

        // 如果 key 名稱能看出意圖，可以做特例
        if (
          subSchema instanceof z.ZodString ||
          subSchema instanceof z.ZodEmail
        ) {
          if (/id/i.test(key)) {
            obj[key] = faker.string.uuid();
            continue;
          }
          if (/email/i.test(key)) {
            obj[key] = faker.internet.email();
            continue;
          }
          if (/name/i.test(key)) {
            obj[key] = faker.person.firstName();
            continue;
          }
          if (/phone/i.test(key) || /mobile/i.test(key)) {
            obj[key] = faker.phone.number();
            continue;
          }
        }
        if (subSchema instanceof z.ZodString) {
          obj[key] = faker.internet.url();
          continue;
        }

        obj[key] = this.mockBySchema(subSchema);
      }
      return obj;
    }

    // ---- array ----
    if (schema instanceof z.ZodArray) {
      const inner = (schema._def as any).type as z.ZodType<unknown>;
      const len = faker.number.int({ min: 1, max: 3 });
      return Array.from({ length: len }, () => this.mockBySchema(inner));
    }

    // ---- union ----
    if (schema instanceof z.ZodUnion) {
      const options = (schema._def as any).options as z.ZodType<unknown>[];
      const idx = faker.number.int({ min: 0, max: options.length - 1 });
      return this.mockBySchema(options[idx]);
    }

    // ---- optional / nullable ----
    if (schema instanceof z.ZodOptional) {
      // 20% 機率回傳 undefined
      if (Math.random() < 0.2) return undefined;

      const innerType = (schema._def as any).innerType as z.ZodType<unknown>;
      return this.mockBySchema(innerType);
    }

    if (schema instanceof z.ZodNullable) {
      // 20% 機率回傳 null
      if (Math.random() < 0.2) return null;

      const innerType = (schema._def as any).innerType as z.ZodType<unknown>;
      return this.mockBySchema(innerType);
    }

    // 其他先給 null，有需求再慢慢補
    return null;
  }
}
