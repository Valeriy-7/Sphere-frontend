import { z } from 'zod'

export const attachmentsGetFilePathParamsSchema = z.object({
  id: z.string().describe('ID вложения файла'),
})

/**
 * @description Возвращает запрошенный файл
 */
export const attachmentsGetFile200Schema = z.any()

/**
 * @description Файл не найден
 */
export const attachmentsGetFile404Schema = z.any()

export const attachmentsGetFileQueryResponseSchema = z.lazy(() => attachmentsGetFile200Schema)