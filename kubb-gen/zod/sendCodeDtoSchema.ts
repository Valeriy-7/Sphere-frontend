import { z } from 'zod';

export const sendCodeDtoSchema = z.object({
  phone: z.string().describe('Номер телефона пользователя в международном формате'),
});
