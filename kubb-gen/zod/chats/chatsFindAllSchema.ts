import { z } from 'zod';

export const chatsFindAllQueryParamsSchema = z.object({
  limit: z.number().default(20).describe('Количество чатов на странице'),
  offset: z.number().default(0).describe('Смещение (для пагинации)'),
  search: z.string().describe('Поисковый запрос').optional(),
});

/**
 * @description Список чатов успешно получен
 */
export const chatsFindAll200Schema = z.any();

export const chatsFindAllQueryResponseSchema = z.lazy(() => chatsFindAll200Schema);
