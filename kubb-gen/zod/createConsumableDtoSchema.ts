import { z } from 'zod'

export const createConsumableDtoSchema = z.object({
  name: z.string().describe('Название расходника'),
  price: z.number().describe('Цена за единицу'),
  description: z.string().describe('Описание расходника'),
  number: z.number().describe('Порядковый номер').optional(),
  image: z.instanceof(File).describe('Изображение расходника'),
})