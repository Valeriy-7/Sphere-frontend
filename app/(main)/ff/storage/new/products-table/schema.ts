import { z } from 'zod';

export const createServiceDtoSchema = z.object({
  id: z.string(),
  key4: z.string().describe('место'),
  sizeList: z.array(
    z.object({
      id: z.string(),
      key5: z.number().describe('количество'),
    }),
  ),
});

export const FormSchema = z.object({
  rows: z.array(createServiceDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
