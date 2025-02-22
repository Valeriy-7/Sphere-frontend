import { z } from 'zod';

const createServiceDtoSchema = z.object({
  name: z.string().min(1).describe('Название услуги'),
  price: z.number().min(1).describe('Цена за единицу'),
  description: z.string().min(1).describe('Описание услуги'),
  number: z.number().describe('Порядковый номер').optional(),
  //imageUrl: z.string().describe('URL изображения'),
  image: z.instanceof(File).describe('Изображение услуги'),
});

export const FormSchema = z.object({
  rows: z.array(createServiceDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
