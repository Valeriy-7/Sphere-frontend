import type { UpdateStorageLocationDtoType } from '../UpdateStorageLocationDtoType'

export type FFStorageUpdateSizeStorageLocationPathParamsType = {
  /**
   * @description Size ID
   * @type string
   */
  sizeId: string
}

/**
 * @description Size storage location updated successfully
 */
export type FFStorageUpdateSizeStorageLocation200Type = any

export type FFStorageUpdateSizeStorageLocationMutationRequestType = UpdateStorageLocationDtoType

export type FFStorageUpdateSizeStorageLocationMutationResponseType = FFStorageUpdateSizeStorageLocation200Type

export type FFStorageUpdateSizeStorageLocationTypeMutation = {
  Response: FFStorageUpdateSizeStorageLocation200Type
  Request: FFStorageUpdateSizeStorageLocationMutationRequestType
  PathParams: FFStorageUpdateSizeStorageLocationPathParamsType
  Errors: any
}