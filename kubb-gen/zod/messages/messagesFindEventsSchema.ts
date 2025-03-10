import { z } from 'zod';

export const messagesFindEventsQueryParamsSchema = z.object({
  chatId: z.string().describe('ID чата'),
  filter: z.enum(['ALL', 'FF', 'WB']).default('ALL').describe('Фильтр поставок'),
  limit: z.number().default(20).describe('Количество событий на странице'),
  offset: z.number().default(0).describe('Смещение (для пагинации)'),
  search: z.string().describe('Поисковый запрос').optional(),
});

/**
 * @description Список событий успешно получен
 */
export const messagesFindEvents200Schema = z.any();

export const messagesFindEventsQueryResponseSchema = z.lazy(() => messagesFindEvents200Schema);
