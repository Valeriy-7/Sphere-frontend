import { z } from 'zod';

export const cityStockDtoSchema = z.object({
  city: z.string().describe('Город'),
  quantity: z.number().describe('Количество на складе'),
});
