import { z } from 'zod';

export const messagesFindAttachmentsQueryParamsSchema = z.object({
  chatId: z.string().describe('ID чата'),
  limit: z.number().default(20).describe('Количество вложений на странице'),
  offset: z.number().default(0).describe('Смещение (для пагинации)'),
  search: z.string().describe('Поисковый запрос').optional(),
});

/**
 * @description Список вложений успешно получен
 */
export const messagesFindAttachments200Schema = z.any();

export const messagesFindAttachmentsQueryResponseSchema = z.lazy(
  () => messagesFindAttachments200Schema,
);
