import { z } from 'zod'

export const verifyCodeDtoSchema = z.object({
  phone: z
    .string()
    .regex(/\+7[0-9]{10}/)
    .min(12)
    .max(12)
    .describe('Номер телефона пользователя в международном формате'),
  code: z
    .string()
    .regex(/[0-9]{4}/)
    .min(4)
    .max(4)
    .describe('Код подтверждения из SMS (4 цифры)'),
})