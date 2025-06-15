import { updateStorageLocationDtoSchema } from '../updateStorageLocationDtoSchema'
import { z } from 'zod'

export const FFStorageUpdateSizeStorageLocationPathParamsSchema = z.object({
  sizeId: z.string().describe('Size ID'),
})

/**
 * @description Size storage location updated successfully
 */
export const FFStorageUpdateSizeStorageLocation200Schema = z.any()

export const FFStorageUpdateSizeStorageLocationMutationRequestSchema = z.lazy(() => updateStorageLocationDtoSchema)

export const FFStorageUpdateSizeStorageLocationMutationResponseSchema = z.lazy(() => FFStorageUpdateSizeStorageLocation200Schema)