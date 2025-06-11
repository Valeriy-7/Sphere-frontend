import { z } from 'zod'

export const attachmentsGetImagePathParamsSchema = z.object({
  id: z.string().describe('ID вложения с изображением'),
})

/**
 * @description Возвращает изображение
 */
export const attachmentsGetImage200Schema = z.any()

/**
 * @description Изображение не найдено
 */
export const attachmentsGetImage404Schema = z.any()

export const attachmentsGetImageQueryResponseSchema = z.lazy(() => attachmentsGetImage200Schema)