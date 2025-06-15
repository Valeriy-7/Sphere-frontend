import { z } from 'zod'

export const updateSizeQuantitiesDtoSchema = z.object({
  sizeId: z.string().describe('Product size ID'),
  factQuantity: z.number().min(0).describe('Fact quantity for this size').optional(),
  defects: z.number().min(0).describe('Defects for this size').optional(),
  storageLocation: z.string().describe('Storage location for this specific size').optional(),
})