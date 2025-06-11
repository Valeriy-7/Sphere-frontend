import { z } from 'zod'

export const createMessageDtoSchema = z.object({
  chatId: z.string().describe('ID чата'),
  type: z.enum(['TEXT', 'VOICE', 'FILE', 'EVENT', 'ATTACHMENT', 'IMAGE', 'VIDEO', 'AUDIO']).default('TEXT').describe('Тип сообщения'),
  text: z.string().describe('Текст сообщения').optional(),
  attachmentIds: z.array(z.string()).describe('Идентификаторы вложений').optional(),
})