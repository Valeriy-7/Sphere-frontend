import { z } from 'zod'

export const updateWorkerDtoSchema = z.object({
  name: z.string().describe('Имя сотрудника').optional(),
  position: z.string().describe('Должность сотрудника').optional(),
})