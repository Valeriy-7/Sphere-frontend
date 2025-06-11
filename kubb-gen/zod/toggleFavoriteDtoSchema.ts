import { z } from 'zod'

export const toggleFavoriteDtoSchema = z.object({
  messageId: z.string().describe('ID сообщения'),
  isFavorite: z.boolean().describe('Флаг добавления в избранное (true) или удаления из избранного (false)'),
})