import { z } from 'zod'

export const messageSchema = z.object({
  id: z.string().describe('ID сообщения'),
  text: z.string().describe('Текст сообщения'),
  chatId: z.string().describe('ID чата'),
  senderId: z.string().describe('ID отправителя'),
  type: z.enum(['TEXT', 'VOICE', 'FILE', 'EVENT', 'ATTACHMENT', 'IMAGE', 'VIDEO', 'AUDIO']).default('TEXT').describe('Тип сообщения'),
})