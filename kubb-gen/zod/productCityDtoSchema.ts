import { z } from 'zod';

export const productCityDtoSchema = z.object({
  name: z.string().describe('Название города'),
  quantity: z.number().describe('Количество товара в городе'),
});
