import { z } from 'zod'

export const createServiceDtoSchema = z.object({
  name: z.string().describe('Название услуги'),
  description: z.string().describe('Описание услуги'),
  price: z.number().describe('Цена услуги'),
  isActive: z.boolean().describe('Активна ли услуга').optional(),
  image: z.instanceof(File).describe('Изображение услуги').optional(),
})