import { z } from 'zod'

export const FFStorageGetStorageAdjustmentHistoryQueryParamsSchema = z
  .object({
    productId: z.string().describe('Filter by product ID').optional(),
    limit: z.number().describe('Limit number of results (default: 50)').optional(),
  })
  .optional()

/**
 * @description Storage adjustment history
 */
export const FFStorageGetStorageAdjustmentHistory200Schema = z.array(
  z.object({
    id: z.string().uuid().optional(),
    adjustmentType: z.enum(['quantity', 'defects', 'location', 'preparation']).optional(),
    adjustmentLevel: z.enum(['product', 'size']).optional(),
    oldValue: z.string().nullable().nullish(),
    newValue: z.string().nullable().nullish(),
    oldQuantity: z.number().nullable().nullish(),
    newQuantity: z.number().nullable().nullish(),
    reason: z.string().nullable().nullish(),
    createdAt: z.date().optional(),
  }),
)

export const FFStorageGetStorageAdjustmentHistoryQueryResponseSchema = z.lazy(() => FFStorageGetStorageAdjustmentHistory200Schema)