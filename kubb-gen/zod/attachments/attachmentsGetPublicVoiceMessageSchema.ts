import { z } from 'zod'

export const attachmentsGetPublicVoiceMessagePathParamsSchema = z.object({
  id: z.string().describe('ID вложения голосового сообщения'),
})

/**
 * @description Возвращает аудиофайл
 */
export const attachmentsGetPublicVoiceMessage200Schema = z.any()

/**
 * @description Голосовое сообщение не найдено
 */
export const attachmentsGetPublicVoiceMessage404Schema = z.any()

export const attachmentsGetPublicVoiceMessageQueryResponseSchema = z.lazy(() => attachmentsGetPublicVoiceMessage200Schema)