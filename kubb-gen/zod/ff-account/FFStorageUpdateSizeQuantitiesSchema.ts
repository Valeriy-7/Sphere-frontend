import { updateSizeQuantitiesDtoSchema } from '../updateSizeQuantitiesDtoSchema'
import { z } from 'zod'

export const FFStorageUpdateSizeQuantitiesPathParamsSchema = z.object({
  sizeId: z.string().uuid().describe('Product Size ID'),
})

/**
 * @description Size data updated successfully
 */
export const FFStorageUpdateSizeQuantities200Schema = z.any()

/**
 * @description Size not found
 */
export const FFStorageUpdateSizeQuantities404Schema = z.any()

export const FFStorageUpdateSizeQuantitiesMutationRequestSchema = z.lazy(() => updateSizeQuantitiesDtoSchema)

export const FFStorageUpdateSizeQuantitiesMutationResponseSchema = z.lazy(() => FFStorageUpdateSizeQuantities200Schema)