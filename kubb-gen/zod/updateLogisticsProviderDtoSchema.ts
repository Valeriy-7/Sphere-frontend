import { z } from 'zod'

export const updateLogisticsProviderDtoSchema = z.object({
  name: z.string().describe('Название компании логиста').optional(),
  contactName: z.string().describe('Имя контактного лица').optional(),
  phone: z.string().describe('Контактный телефон').optional(),
  carModel: z.string().describe('Модель автомобиля').optional(),
  carNumber: z.string().describe('Номер автомобиля').optional(),
  telegram: z.string().describe('Telegram аккаунт').optional(),
})