import type { UpdateStorageLocationDtoType } from '../UpdateStorageLocationDtoType'

export type FFStorageUpdateProductStorageLocationPathParamsType = {
  /**
   * @description Product ID
   * @type string, uuid
   */
  productId: string
}

/**
 * @description Storage location updated successfully
 */
export type FFStorageUpdateProductStorageLocation200Type = any

/**
 * @description Product not found
 */
export type FFStorageUpdateProductStorageLocation404Type = any

export type FFStorageUpdateProductStorageLocationMutationRequestType = UpdateStorageLocationDtoType

export type FFStorageUpdateProductStorageLocationMutationResponseType = FFStorageUpdateProductStorageLocation200Type

export type FFStorageUpdateProductStorageLocationTypeMutation = {
  Response: FFStorageUpdateProductStorageLocation200Type
  Request: FFStorageUpdateProductStorageLocationMutationRequestType
  PathParams: FFStorageUpdateProductStorageLocationPathParamsType
  Errors: FFStorageUpdateProductStorageLocation404Type
}