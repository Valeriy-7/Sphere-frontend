import { z } from 'zod'

export const assignPreparationPersonnelDtoSchema = z.object({
  responsibleId: z.string().uuid().describe('ID ответственного сотрудника за подготовку'),
  performerIds: z.array(z.string().uuid()).describe('Массив ID сотрудников-исполнителей подготовки'),
})