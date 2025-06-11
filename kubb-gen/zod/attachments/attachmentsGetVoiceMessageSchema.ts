import { z } from 'zod'

export const attachmentsGetVoiceMessagePathParamsSchema = z.object({
  id: z.string().describe('ID вложения голосового сообщения'),
})

/**
 * @description Возвращает аудиофайл
 */
export const attachmentsGetVoiceMessage200Schema = z.any()

/**
 * @description Голосовое сообщение не найдено
 */
export const attachmentsGetVoiceMessage404Schema = z.any()

export const attachmentsGetVoiceMessageQueryResponseSchema = z.lazy(() => attachmentsGetVoiceMessage200Schema)