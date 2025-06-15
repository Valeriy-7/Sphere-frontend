import type { UpdateSizeQuantitiesDtoType } from '../UpdateSizeQuantitiesDtoType'

export type FFStorageUpdateSizeQuantitiesPathParamsType = {
  /**
   * @description Product Size ID
   * @type string, uuid
   */
  sizeId: string
}

/**
 * @description Size data updated successfully
 */
export type FFStorageUpdateSizeQuantities200Type = any

/**
 * @description Size not found
 */
export type FFStorageUpdateSizeQuantities404Type = any

export type FFStorageUpdateSizeQuantitiesMutationRequestType = UpdateSizeQuantitiesDtoType

export type FFStorageUpdateSizeQuantitiesMutationResponseType = FFStorageUpdateSizeQuantities200Type

export type FFStorageUpdateSizeQuantitiesTypeMutation = {
  Response: FFStorageUpdateSizeQuantities200Type
  Request: FFStorageUpdateSizeQuantitiesMutationRequestType
  PathParams: FFStorageUpdateSizeQuantitiesPathParamsType
  Errors: FFStorageUpdateSizeQuantities404Type
}