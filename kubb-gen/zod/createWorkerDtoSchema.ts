import { z } from 'zod'

export const createWorkerDtoSchema = z.object({
  name: z.string().describe('Имя сотрудника'),
  position: z.string().describe('Должность сотрудника (необязательно)').optional(),
})