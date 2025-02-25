import { z } from 'zod'

export const createConsumableDtoSchema = z.object({
  name: z.string().describe('Название расходника'),
  price: z.number().describe('Цена за единицу'),
  quantity: z.number().describe('Количество в наличии'),
  description: z.string().describe('Описание расходника'),
  number: z.number().describe('Порядковый номер (генерируется автоматически)').optional(),
  image: z.instanceof(File).describe('Изображение расходника'),
})