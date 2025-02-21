import { z } from 'zod';
import {createServiceDtoSchema} from "@/kubb-gen";

export const FormSchema = z.object({
  rows: z.array(createServiceDtoSchema).min(1, 'Добавьте'),
});
export type FormValues = z.infer<typeof FormSchema>;
