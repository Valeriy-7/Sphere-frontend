import { z } from 'zod'

export const activateCabinetDtoSchema = z.object({
  comment: z.string().describe('Комментарий к активации').nullable().nullish(),
  metadata: z.object({}).describe('Дополнительные метаданные').nullable().nullish(),
})