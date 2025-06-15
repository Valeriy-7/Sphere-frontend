import { z } from 'zod'

export const manualQuantityAdjustmentDtoSchema = z.object({
  factQuantity: z.number().describe('Fact quantity to set').optional(),
  defects: z.number().describe('Defects quantity to set').optional(),
  reason: z.string().describe('Reason for manual adjustment').optional(),
})