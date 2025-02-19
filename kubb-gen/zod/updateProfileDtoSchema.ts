import { z } from 'zod'

export const updateProfileDtoSchema = z.object({
  fullName: z.string().min(2).max(100).describe('ФИО пользователя'),
})