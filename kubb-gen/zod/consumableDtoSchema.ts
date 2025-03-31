import { z } from 'zod'

export const consumableDtoSchema = z.object({
  id: z.string().describe('ID расходника'),
  name: z.string().describe('Название расходника'),
  price: z.number().min(0.01).describe('Цена расходника'),
})