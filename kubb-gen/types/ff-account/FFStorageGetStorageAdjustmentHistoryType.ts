export type FFStorageGetStorageAdjustmentHistoryQueryParamsType = {
  /**
   * @description Filter by product ID
   * @type string | undefined
   */
  productId?: string
  /**
   * @description Limit number of results (default: 50)
   * @type number | undefined
   */
  limit?: number
}

export const FFStorageControllerGetStorageAdjustmentHistory200AdjustmentTypeEnum = {
  quantity: 'quantity',
  defects: 'defects',
  location: 'location',
  preparation: 'preparation',
} as const

export type FFStorageGetStorageAdjustmentHistory200AdjustmentTypeEnumType =
  (typeof FFStorageControllerGetStorageAdjustmentHistory200AdjustmentTypeEnum)[keyof typeof FFStorageControllerGetStorageAdjustmentHistory200AdjustmentTypeEnum]

export const FFStorageControllerGetStorageAdjustmentHistory200AdjustmentLevelEnum = {
  product: 'product',
  size: 'size',
} as const

export type FFStorageGetStorageAdjustmentHistory200AdjustmentLevelEnumType =
  (typeof FFStorageControllerGetStorageAdjustmentHistory200AdjustmentLevelEnum)[keyof typeof FFStorageControllerGetStorageAdjustmentHistory200AdjustmentLevelEnum]

/**
 * @description Storage adjustment history
 */
export type FFStorageGetStorageAdjustmentHistory200Type = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  adjustmentType?: FFStorageGetStorageAdjustmentHistory200AdjustmentTypeEnumType
  /**
   * @type string | undefined
   */
  adjustmentLevel?: FFStorageGetStorageAdjustmentHistory200AdjustmentLevelEnumType
  /**
   * @type string
   */
  oldValue?: string | null
  /**
   * @type string
   */
  newValue?: string | null
  /**
   * @type number
   */
  oldQuantity?: number | null
  /**
   * @type number
   */
  newQuantity?: number | null
  /**
   * @type string
   */
  reason?: string | null
  /**
   * @type string | undefined, date-time
   */
  createdAt?: string
}[]

export type FFStorageGetStorageAdjustmentHistoryQueryResponseType = FFStorageGetStorageAdjustmentHistory200Type

export type FFStorageGetStorageAdjustmentHistoryTypeQuery = {
  Response: FFStorageGetStorageAdjustmentHistory200Type
  QueryParams: FFStorageGetStorageAdjustmentHistoryQueryParamsType
  Errors: any
}