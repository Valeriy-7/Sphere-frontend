import { userTypeSchema } from './userTypeSchema';
import { z } from 'zod';

export const completeRegistrationDtoSchema = z.object({
  type: z.lazy(() => userTypeSchema).describe('Тип кабинета (продавец Wildberries или фулфилмент)'),
  apiKey: z
    .string()
    .min(32)
    .describe('API ключ Wildberries (обязательное поле для продавцов Wildberries)')
    .optional(),
  inn: z
    .string()
    .regex(/^\d{10}$|^\d{12}$/)
    .describe('ИНН компании (обязательное поле)'),
  token: z.string().describe('Токен для связи с партнерским аккаунтом').optional(),
});
