import { z } from 'zod';

export const verifyCabinetDtoSchema = z.object({
  isVerified: z.boolean().describe('Статус верификации кабинета'),
  comment: z.string().describe('Комментарий администратора').optional(),
});
