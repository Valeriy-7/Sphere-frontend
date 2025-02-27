import { z } from 'zod';

export const selectedConsumableDtoSchema = z.object({
  id: z.string().describe('ID расходника'),
  name: z.string().describe('Название расходника'),
  price: z.number().describe('Цена расходника'),
});
