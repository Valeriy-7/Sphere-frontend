import { z } from 'zod'

export const messagesFindAllQueryParamsSchema = z.object({
  chatId: z.string().describe('ID чата'),
  limit: z.number().default(20).describe('Количество сообщений на странице'),
  offset: z.number().default(0).describe('Смещение (для пагинации)'),
  search: z.string().describe('Поисковый запрос').optional(),
})

/**
 * @description Список сообщений успешно получен
 */
export const messagesFindAll200Schema = z.any()

export const messagesFindAllQueryResponseSchema = z.lazy(() => messagesFindAll200Schema)