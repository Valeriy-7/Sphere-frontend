export type ManualQuantityAdjustmentDtoType = {
  /**
   * @description Fact quantity to set
   * @type number | undefined
   */
  factQuantity?: number
  /**
   * @description Defects quantity to set
   * @type number | undefined
   */
  defects?: number
  /**
   * @description Reason for manual adjustment
   * @type string | undefined
   */
  reason?: string
}