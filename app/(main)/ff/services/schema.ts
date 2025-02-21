import { z } from 'zod';

const createServiceDtoSchema = z.object({
  name: z.string().describe('Название услуги'),
  price: z.number().min(1).describe('Цена за единицу'),
  description: z.string().describe('Описание услуги'),
  number: z.number().describe('Порядковый номер').optional(),
  image: z.instanceof(File).describe('Изображение услуги'),
})

export const FormSchema = z.object({
  rows: z.array(createServiceDtoSchema).min(1, 'Добавьте'),
});
export type FormValues = z.infer<typeof FormSchema>;
