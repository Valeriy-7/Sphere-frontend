import { z } from 'zod'

export const createServiceDtoSchema = z.object({
  name: z.string().describe('Название услуги'),
  price: z.number().describe('Цена за единицу'),
  description: z.string().describe('Описание услуги'),
  number: z.number().describe('Порядковый номер').optional(),
  image: z.instanceof(File).describe('Изображение услуги'),
})