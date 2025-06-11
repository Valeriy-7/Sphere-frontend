import { z } from 'zod'

export const responsiblePersonListItemDtoSchema = z.object({
  id: z.string().uuid().describe('ID пользователя'),
  name: z.string().describe('Полное имя пользователя'),
})