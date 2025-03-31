import { cityStockDtoSchema } from './cityStockDtoSchema'
import { z } from 'zod'

export const productDetailsDtoSchema = z.object({
  id: z.string().describe('ID продукта'),
  article: z.string().describe('Артикул WB'),
  color: z.string().describe('Цвет'),
  category: z.string().describe('Категория'),
  total: z.number().describe('Общее количество'),
  inStock: z.number().describe('Количество на складах'),
  inTransitToClient: z.number().describe('В пути к клиенту'),
  inTransitFromClient: z.number().describe('В пути от клиента'),
  sizes: z.array(z.string()).describe('Размеры'),
  cities: z.array(z.lazy(() => cityStockDtoSchema)).describe('Распределение по городам'),
})