export type FFStorageUpdateDeliveryProductSizePathParamsType = {
  /**
   * @description Delivery Product ID
   * @type string, uuid
   */
  productId: string
  /**
   * @description Size index in sizeQuantities array (0-based)
   * @type number
   */
  sizeIndex: number
}

/**
 * @description Delivery product size data updated successfully
 */
export type FFStorageUpdateDeliveryProductSize200Type = any

/**
 * @description Product or size not found
 */
export type FFStorageUpdateDeliveryProductSize404Type = any

export type FFStorageUpdateDeliveryProductSizeMutationRequestType = {
  /**
   * @description Fact quantity for this size
   * @minLength 0
   * @type number | undefined
   */
  factQuantity?: number
  /**
   * @description Defects for this size
   * @minLength 0
   * @type number | undefined
   */
  defects?: number
  /**
   * @description Storage location for this size
   * @type string | undefined
   */
  storageLocation?: string
}

export type FFStorageUpdateDeliveryProductSizeMutationResponseType = FFStorageUpdateDeliveryProductSize200Type

export type FFStorageUpdateDeliveryProductSizeTypeMutation = {
  Response: FFStorageUpdateDeliveryProductSize200Type
  Request: FFStorageUpdateDeliveryProductSizeMutationRequestType
  PathParams: FFStorageUpdateDeliveryProductSizePathParamsType
  Errors: FFStorageUpdateDeliveryProductSize404Type
}