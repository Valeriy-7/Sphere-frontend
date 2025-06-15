import { batchUpdateSizesDtoSchema } from '../batchUpdateSizesDtoSchema'
import { z } from 'zod'

/**
 * @description Sizes updated successfully
 */
export const FFStorageBatchUpdateSizes200Schema = z.any()

export const FFStorageBatchUpdateSizesMutationRequestSchema = z.lazy(() => batchUpdateSizesDtoSchema)

export const FFStorageBatchUpdateSizesMutationResponseSchema = z.lazy(() => FFStorageBatchUpdateSizes200Schema)