import { z } from 'zod'

export const updateProductLocationDtoSchema = z.object({
  storageLocation: z.string().describe('Новое место хранения продукта'),
})