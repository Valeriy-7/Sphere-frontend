import type { UpdateProductStorageDataDtoType } from '../UpdateProductStorageDataDtoType'

export type FFStorageUpdateProductStorageDataPathParamsType = {
  /**
   * @description Product ID
   * @type string, uuid
   */
  productId: string
}

/**
 * @description Product storage data updated successfully
 */
export type FFStorageUpdateProductStorageData200Type = any

/**
 * @description Product not found
 */
export type FFStorageUpdateProductStorageData404Type = any

export type FFStorageUpdateProductStorageDataMutationRequestType = UpdateProductStorageDataDtoType

export type FFStorageUpdateProductStorageDataMutationResponseType = FFStorageUpdateProductStorageData200Type

export type FFStorageUpdateProductStorageDataTypeMutation = {
  Response: FFStorageUpdateProductStorageData200Type
  Request: FFStorageUpdateProductStorageDataMutationRequestType
  PathParams: FFStorageUpdateProductStorageDataPathParamsType
  Errors: FFStorageUpdateProductStorageData404Type
}