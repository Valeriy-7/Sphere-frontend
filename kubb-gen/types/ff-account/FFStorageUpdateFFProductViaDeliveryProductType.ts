import type { ManualQuantityAdjustmentDtoType } from '../ManualQuantityAdjustmentDtoType'

export type FFStorageUpdateFFProductViaDeliveryProductPathParamsType = {
  /**
   * @description Delivery Product ID
   * @type string, uuid
   */
  deliveryProductId: string
}

/**
 * @description FF product quantities updated successfully
 */
export type FFStorageUpdateFFProductViaDeliveryProduct200Type = any

/**
 * @description Delivery product or corresponding FF product not found
 */
export type FFStorageUpdateFFProductViaDeliveryProduct404Type = any

export type FFStorageUpdateFFProductViaDeliveryProductMutationRequestType = ManualQuantityAdjustmentDtoType

export type FFStorageUpdateFFProductViaDeliveryProductMutationResponseType = FFStorageUpdateFFProductViaDeliveryProduct200Type

export type FFStorageUpdateFFProductViaDeliveryProductTypeMutation = {
  Response: FFStorageUpdateFFProductViaDeliveryProduct200Type
  Request: FFStorageUpdateFFProductViaDeliveryProductMutationRequestType
  PathParams: FFStorageUpdateFFProductViaDeliveryProductPathParamsType
  Errors: FFStorageUpdateFFProductViaDeliveryProduct404Type
}