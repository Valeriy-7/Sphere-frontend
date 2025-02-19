import { z } from 'zod';

const NestedFieldSchema = z.object({
  id: z.string(),
  place: z.string().min(1),
  factList: z.array(z.number()),
  defectiveList: z.array(z.number()),
});

export const FormSchema = z.object({
  id: z.string(),
  rows: z.array(NestedFieldSchema).min(1, 'Выберите поставку'),
});
export type FormValues = z.infer<typeof FormSchema>;
