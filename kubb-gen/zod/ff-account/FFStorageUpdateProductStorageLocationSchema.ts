import { updateStorageLocationDtoSchema } from '../updateStorageLocationDtoSchema'
import { z } from 'zod'

export const FFStorageUpdateProductStorageLocationPathParamsSchema = z.object({
  productId: z.string().uuid().describe('Product ID'),
})

/**
 * @description Storage location updated successfully
 */
export const FFStorageUpdateProductStorageLocation200Schema = z.any()

/**
 * @description Product not found
 */
export const FFStorageUpdateProductStorageLocation404Schema = z.any()

export const FFStorageUpdateProductStorageLocationMutationRequestSchema = z.lazy(() => updateStorageLocationDtoSchema)

export const FFStorageUpdateProductStorageLocationMutationResponseSchema = z.lazy(() => FFStorageUpdateProductStorageLocation200Schema)