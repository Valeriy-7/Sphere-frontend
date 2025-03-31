import { z } from 'zod'

/**
 * @description Голосовое сообщение успешно загружено
 */
export const attachmentsUploadVoice201Schema = z.any()

export const attachmentsUploadVoiceMutationRequestSchema = z.object({
  file: z.instanceof(File).optional(),
  chatId: z.string().optional(),
  duration: z.number().optional(),
})

export const attachmentsUploadVoiceMutationResponseSchema = z.lazy(() => attachmentsUploadVoice201Schema)