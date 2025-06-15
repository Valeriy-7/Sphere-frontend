import { z } from 'zod'

export const FFStorageUpdateDeliveryProductSizePathParamsSchema = z.object({
  productId: z.string().uuid().describe('Delivery Product ID'),
  sizeIndex: z.number().describe('Size index in sizeQuantities array (0-based)'),
})

/**
 * @description Delivery product size data updated successfully
 */
export const FFStorageUpdateDeliveryProductSize200Schema = z.any()

/**
 * @description Product or size not found
 */
export const FFStorageUpdateDeliveryProductSize404Schema = z.any()

export const FFStorageUpdateDeliveryProductSizeMutationRequestSchema = z.object({
  factQuantity: z.number().min(0).describe('Fact quantity for this size').optional(),
  defects: z.number().min(0).describe('Defects for this size').optional(),
  storageLocation: z.string().describe('Storage location for this size').optional(),
})

export const FFStorageUpdateDeliveryProductSizeMutationResponseSchema = z.lazy(() => FFStorageUpdateDeliveryProductSize200Schema)