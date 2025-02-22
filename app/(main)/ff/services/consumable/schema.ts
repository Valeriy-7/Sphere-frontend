import { z } from 'zod';

export const createConsumableDtoSchema = z.object({
  name: z.string().min(1).describe('Название расходника'),
  price: z.number().min(1).describe('Цена за единицу'),
  description: z.string().min(1).describe('Описание расходника'),
  number: z.number().describe('Порядковый номер').optional(),
  image: z.instanceof(File).describe('Изображение расходника'),
});

export const FormSchema = z.object({
  rows: z.array(createConsumableDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
