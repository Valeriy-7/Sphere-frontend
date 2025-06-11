import { z } from 'zod'

export const updateProductQuantitiesDtoSchema = z.object({
  factQuantity: z.number().min(0).describe('Фактическое количество принятого товара (Факт)'),
  defects: z.number().min(0).describe('Количество бракованного товара (Брак)'),
})