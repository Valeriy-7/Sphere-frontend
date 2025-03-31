import { z } from 'zod'

export const messagesFindFavoritesQueryParamsSchema = z.object({
  chatId: z.string().describe('ID чата'),
  limit: z.number().default(20).describe('Количество сообщений на странице'),
  offset: z.number().default(0).describe('Смещение (для пагинации)'),
  search: z.string().describe('Поисковый запрос').optional(),
})

/**
 * @description Список избранных сообщений успешно получен
 */
export const messagesFindFavorites200Schema = z.any()

export const messagesFindFavoritesQueryResponseSchema = z.lazy(() => messagesFindFavorites200Schema)