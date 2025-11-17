import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const enqueueEmailDtoSchema = z.object({
  to: z.email('必須是有效的電子郵件地址'),
  subject: z.string().min(1, '郵件主題不能為空'),
  body: z.string().min(1, '郵件內容不能為空'),
  from: z.email('必須是有效的電子郵件地址').optional(),
  cc: z.string().optional(),
  bcc: z.string().optional(),
});

export class EnqueueEmailDto extends createZodDto(enqueueEmailDtoSchema) {}
