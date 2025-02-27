import { z } from 'zod';

export const deliveryPointDtoSchema = z.object({
  name: z.string().describe('Название точки доставки'),
  id: z.string().describe('Уникальный идентификатор точки'),
  type: z.enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE']).describe('Тип точки доставки'),
});
