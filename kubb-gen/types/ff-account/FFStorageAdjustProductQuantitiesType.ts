import type { ManualQuantityAdjustmentDtoType } from '../ManualQuantityAdjustmentDtoType'

export type FFStorageAdjustProductQuantitiesPathParamsType = {
  /**
   * @description Product ID
   * @type string, uuid
   */
  productId: string
}

/**
 * @description Quantities adjusted successfully
 */
export type FFStorageAdjustProductQuantities200Type = any

/**
 * @description Product not found
 */
export type FFStorageAdjustProductQuantities404Type = any

export type FFStorageAdjustProductQuantitiesMutationRequestType = ManualQuantityAdjustmentDtoType

export type FFStorageAdjustProductQuantitiesMutationResponseType = FFStorageAdjustProductQuantities200Type

export type FFStorageAdjustProductQuantitiesTypeMutation = {
  Response: FFStorageAdjustProductQuantities200Type
  Request: FFStorageAdjustProductQuantitiesMutationRequestType
  PathParams: FFStorageAdjustProductQuantitiesPathParamsType
  Errors: FFStorageAdjustProductQuantities404Type
}