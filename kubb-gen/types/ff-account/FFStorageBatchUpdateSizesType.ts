import type { BatchUpdateSizesDtoType } from '../BatchUpdateSizesDtoType'

/**
 * @description Sizes updated successfully
 */
export type FFStorageBatchUpdateSizes200Type = any

export type FFStorageBatchUpdateSizesMutationRequestType = BatchUpdateSizesDtoType

export type FFStorageBatchUpdateSizesMutationResponseType = FFStorageBatchUpdateSizes200Type

export type FFStorageBatchUpdateSizesTypeMutation = {
  Response: FFStorageBatchUpdateSizes200Type
  Request: FFStorageBatchUpdateSizesMutationRequestType
  Errors: any
}