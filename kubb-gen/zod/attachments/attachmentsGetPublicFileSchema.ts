import { z } from 'zod'

export const attachmentsGetPublicFilePathParamsSchema = z.object({
  id: z.string().describe('ID вложения файла'),
})

/**
 * @description Возвращает запрошенный файл
 */
export const attachmentsGetPublicFile200Schema = z.any()

/**
 * @description Файл не найден или нет доступа
 */
export const attachmentsGetPublicFile404Schema = z.any()

export const attachmentsGetPublicFileQueryResponseSchema = z.lazy(() => attachmentsGetPublicFile200Schema)