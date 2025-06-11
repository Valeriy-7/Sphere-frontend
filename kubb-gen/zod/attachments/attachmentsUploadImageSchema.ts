import { z } from 'zod'

/**
 * @description Изображение успешно загружено
 */
export const attachmentsUploadImage201Schema = z.any()

export const attachmentsUploadImageMutationRequestSchema = z.object({
  file: z.instanceof(File).optional(),
  chatId: z.string().optional(),
  text: z.string().optional(),
})

export const attachmentsUploadImageMutationResponseSchema = z.lazy(() => attachmentsUploadImage201Schema)