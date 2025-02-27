import { z } from 'zod';

export const blockUserDtoSchema = z.object({
  isBlocked: z.boolean().describe('Статус блокировки пользователя'),
  reason: z.string().describe('Причина блокировки (обязательна при isBlocked=true)'),
  unblockReason: z
    .string()
    .describe('Причина разблокировки (опционально при isBlocked=false)')
    .optional(),
});
