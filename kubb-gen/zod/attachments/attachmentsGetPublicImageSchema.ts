import { z } from 'zod'

export const attachmentsGetPublicImagePathParamsSchema = z.object({
  id: z.string().describe('ID вложения с изображением'),
})

/**
 * @description Возвращает изображение
 */
export const attachmentsGetPublicImage200Schema = z.any()

/**
 * @description Изображение не найдено или нет доступа
 */
export const attachmentsGetPublicImage404Schema = z.any()

export const attachmentsGetPublicImageQueryResponseSchema = z.lazy(() => attachmentsGetPublicImage200Schema)