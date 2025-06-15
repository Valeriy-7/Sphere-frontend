import { manualQuantityAdjustmentDtoSchema } from '../manualQuantityAdjustmentDtoSchema'
import { z } from 'zod'

export const FFStorageUpdateFFProductViaDeliveryProductPathParamsSchema = z.object({
  deliveryProductId: z.string().uuid().describe('Delivery Product ID'),
})

/**
 * @description FF product quantities updated successfully
 */
export const FFStorageUpdateFFProductViaDeliveryProduct200Schema = z.any()

/**
 * @description Delivery product or corresponding FF product not found
 */
export const FFStorageUpdateFFProductViaDeliveryProduct404Schema = z.any()

export const FFStorageUpdateFFProductViaDeliveryProductMutationRequestSchema = z.lazy(() => manualQuantityAdjustmentDtoSchema)

export const FFStorageUpdateFFProductViaDeliveryProductMutationResponseSchema = z.lazy(() => FFStorageUpdateFFProductViaDeliveryProduct200Schema)