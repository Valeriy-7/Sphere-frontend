import { z } from 'zod';
import { createConsumableDtoSchema } from "@/kubb-gen";

export const FormSchema = z.object({
  rows: z.array(createConsumableDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
