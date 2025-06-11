import { z } from 'zod'

export const workerListItemDtoSchema = z.object({
  id: z.string().describe('Уникальный идентификатор сотрудника'),
  name: z.string().describe('Имя сотрудника'),
  position: z.string().describe('Должность сотрудника (необязательно)').optional(),
})