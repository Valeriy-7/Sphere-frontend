import { z } from 'zod';
import { createLogisticsDtoSchema } from '@/kubb-gen';

export const FormSchema = z.object({
  rows: z.array(createLogisticsDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
