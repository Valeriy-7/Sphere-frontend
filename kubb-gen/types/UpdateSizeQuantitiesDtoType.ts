export type UpdateSizeQuantitiesDtoType = {
  /**
   * @description Product size ID
   * @type string
   */
  sizeId: string
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
   * @description Storage location for this specific size
   * @type string | undefined
   */
  storageLocation?: string
}