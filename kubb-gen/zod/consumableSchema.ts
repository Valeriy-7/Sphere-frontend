import { z } from 'zod'

export const consumableSchema = z.object({
  id: z.string().describe('ID расходника'),
  cabinetId: z.string().describe('ID кабинета'),
  number: z.number().describe('Порядковый номер'),
  name: z.string().describe('Название расходника'),
  imageUrl: z.string().describe('URL изображения'),
  price: z.number().describe('Цена за единицу'),
  quantity: z.number().describe('Количество в наличии'),
  description: z.string().describe('Описание расходника'),
})