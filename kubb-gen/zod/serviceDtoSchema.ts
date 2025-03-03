import { z } from 'zod';

export const serviceDtoSchema = z.object({
  id: z.string().describe('ID услуги'),
  name: z.string().describe('Название услуги'),
  price: z.number().min(0.01).describe('Цена услуги'),
});
