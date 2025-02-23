import { z } from 'zod';
import { createServiceDtoSchema } from '@/kubb-gen';

export const FormSchema = z.object({
  rows: z.array(createServiceDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
