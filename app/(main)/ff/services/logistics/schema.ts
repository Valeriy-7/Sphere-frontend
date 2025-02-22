import { z } from 'zod';

export const createLogisticsDtoSchema = z.object({
  fromLocation: z.string().min(1).describe('Место отправления'),
  //fromAddress: z.string().min(1).describe('Адрес отправления'),
  toLocation: z.string().min(1).describe('Место назначения'),
  //toAddress: z.string().min(1).describe('Адрес назначения'),
  priceUpTo1m3: z.number().min(1).describe('Цена до 1м3'),
  pricePer1m3: z.number().min(1).describe('Цена за 1м3'),
  comment: z.string().min(1).describe('Комментарий').optional(),
  number: z.number().describe('Порядковый номер').optional(),
})

export const FormSchema = z.object({
  rows: z.array(createLogisticsDtoSchema),
});
export type FormValues = z.infer<typeof FormSchema>;
