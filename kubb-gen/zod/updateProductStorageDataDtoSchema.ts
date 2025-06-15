import { manualQuantityAdjustmentDtoSchema } from './manualQuantityAdjustmentDtoSchema'
import { updateSizeQuantitiesDtoSchema } from './updateSizeQuantitiesDtoSchema'
import { z } from 'zod'

export const updateProductStorageDataDtoSchema = z.object({
  storageLocation: z.string().describe('Product storage location').optional(),
  quantityAdjustment: z
    .lazy(() => manualQuantityAdjustmentDtoSchema)
    .describe('Manual quantity adjustment for product level')
    .optional(),
  sizes: z
    .array(z.lazy(() => updateSizeQuantitiesDtoSchema))
    .describe('Size-level updates')
    .optional(),
})