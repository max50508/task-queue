import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetHelloDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email('必須是有效的電子郵件地址'),
});

export class GetHelloDto extends createZodDto(GetHelloDtoSchema) {}
