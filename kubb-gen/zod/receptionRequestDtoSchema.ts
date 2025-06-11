import { z } from 'zod'

export const receptionRequestDtoSchema = z.object({
  status: z.enum(['new', 'reception', 'accepted', 'preparation', 'completed']).describe('Статус поставки').optional(),
  responsibleIds: z.array(z.string().uuid()).describe('Массив ID ответственных сотрудников').nullable().nullish(),
  logisticsTypeId: z.string().describe('ID типа логистики').nullable().nullish(),
  packagingType: z.string().describe('Тип упаковки (текст)').nullable().nullish(),
  workingHours: z.string().describe('Время работы (текст)').nullable().nullish(),
})