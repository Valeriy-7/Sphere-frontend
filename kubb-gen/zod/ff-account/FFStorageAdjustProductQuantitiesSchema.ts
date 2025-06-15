import { manualQuantityAdjustmentDtoSchema } from '../manualQuantityAdjustmentDtoSchema'
import { z } from 'zod'

export const FFStorageAdjustProductQuantitiesPathParamsSchema = z.object({
  productId: z.string().uuid().describe('Product ID'),
})

/**
 * @description Quantities adjusted successfully
 */
export const FFStorageAdjustProductQuantities200Schema = z.any()

/**
 * @description Product not found
 */
export const FFStorageAdjustProductQuantities404Schema = z.any()

export const FFStorageAdjustProductQuantitiesMutationRequestSchema = z.lazy(() => manualQuantityAdjustmentDtoSchema)

export const FFStorageAdjustProductQuantitiesMutationResponseSchema = z.lazy(() => FFStorageAdjustProductQuantities200Schema)