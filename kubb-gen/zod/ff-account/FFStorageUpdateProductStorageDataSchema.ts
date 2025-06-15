import { updateProductStorageDataDtoSchema } from '../updateProductStorageDataDtoSchema'
import { z } from 'zod'

export const FFStorageUpdateProductStorageDataPathParamsSchema = z.object({
  productId: z.string().uuid().describe('Product ID'),
})

/**
 * @description Product storage data updated successfully
 */
export const FFStorageUpdateProductStorageData200Schema = z.any()

/**
 * @description Product not found
 */
export const FFStorageUpdateProductStorageData404Schema = z.any()

export const FFStorageUpdateProductStorageDataMutationRequestSchema = z.lazy(() => updateProductStorageDataDtoSchema)

export const FFStorageUpdateProductStorageDataMutationResponseSchema = z.lazy(() => FFStorageUpdateProductStorageData200Schema)