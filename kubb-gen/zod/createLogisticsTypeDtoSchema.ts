import { z } from 'zod'

export const createLogisticsTypeDtoSchema = z.object({
  name: z.string().describe('Название типа логистики'),
  contactName: z.string().describe('Имя контактного лица').optional(),
  contactPhone: z.string().describe('Телефон контактного лица').optional(),
  carModel: z.string().describe('Модель автомобиля').optional(),
  carNumber: z.string().describe('Государственный номер автомобиля').optional(),
  capacity: z.number().describe('Вместимость (объем) в кубических метрах').optional(),
  telegramContact: z.string().describe('Telegram контакт').optional(),
  logisticsType: z.string().describe('Тип логистики').optional(),
})