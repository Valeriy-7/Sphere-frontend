import { z } from 'zod';

export const deliveryPointDtoSchema = z.object({
  name: z.string().describe('Название точки доставки'),
  id: z.string().describe('Идентификатор точки доставки'),
  type: z.enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE']).describe('Тип точки доставки'),
  isPartner: z
    .boolean()
    .describe('Флаг, указывающий является ли фулфилмент партнером текущего кабинета')
    .optional(),
  address: z.string().describe('Адрес точки доставки').optional(),
});
