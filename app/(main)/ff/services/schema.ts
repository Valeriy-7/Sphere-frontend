import { z } from 'zod';

const serviceSchema = z.object({
  // id: z.string().describe('ID услуги'),
  //cabinetId: z.string().describe('ID кабинета'),
  number: z.number().describe('Порядковый номер'),
  //name: z.string().min(1).describe('Название услуги'),
  //imageUrl: z.string().describe('URL изображения'),
  price: z.number().min(5).describe('Цена за единицу'),
  description: z.string().min(1).describe('Описание услуги'),
  //type: z.enum(['service', 'logistics', 'consumable']).describe('Тип услуги (услуга/логистика/расходник)'),
});

const createServiceDtoSchema = z.object({
  name: z.string().min(1).describe('Название услуги'),
  price: z.number().min(1).describe('Цена за единицу'),
  description: z.string().min(1).describe('Описание услуги'),
  number: z.number().describe('Порядковый номер').optional(),
  imageUrl: z.string().describe('URL изображения'),
});

export const FormSchema = z.object({
  rows: z.array(createServiceDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
