import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().describe('ID услуги'),
  cabinetId: z.string().describe('ID кабинета'),
  number: z.number().describe('Порядковый номер'),
  name: z.string().describe('Название услуги'),
  imageUrl: z.string().describe('URL изображения'),
  price: z.number().describe('Цена за единицу'),
  description: z.string().describe('Описание услуги'),
  type: z.enum(['service', 'logistics', 'consumable']).describe('Тип услуги (услуга/логистика/расходник)'),
})