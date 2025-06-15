import { z } from 'zod'

export const updateReadyStatusDtoSchema = z.object({
  readyStatus: z.enum(['new', 'ready', 'in_work']).describe('Статус готовности для подготовки'),
})