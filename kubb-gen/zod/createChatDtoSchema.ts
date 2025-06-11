import { z } from 'zod'

export const createChatDtoSchema = z.object({
  partnerId: z.string().describe('ID кабинета партнера'),
})