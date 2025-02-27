import { authUserDataDtoSchema } from './authUserDataDtoSchema';
import { z } from 'zod';

export const authResponseDtoSchema = z.object({
  token: z.string().describe('JWT токен для авторизации (срок действия 30 дней)'),
  user: z.lazy(() => authUserDataDtoSchema).describe('Данные пользователя'),
});
