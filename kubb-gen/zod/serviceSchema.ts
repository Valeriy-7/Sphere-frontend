import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().describe('ID услуги'),
  number: z.number().describe('Порядковый номер услуги'),
  cabinetId: z.string().describe('ID кабинета'),
  name: z.string().describe('Название услуги'),
  description: z.string().describe('Описание услуги'),
  imageUrl: z.string().describe('URL изображения услуги').optional(),
  price: z.number().describe('Цена услуги'),
  createdAt: z.date().describe('Дата создания'),
  updatedAt: z.date().describe('Дата обновления'),
})