import { z } from 'zod'

export const markAsReadDtoSchema = z.object({
  chatId: z.string().describe('ID чата'),
})