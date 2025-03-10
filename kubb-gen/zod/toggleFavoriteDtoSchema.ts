import { z } from 'zod';

export const toggleFavoriteDtoSchema = z.object({
  messageId: z.string().describe('ID сообщения'),
});
