export type UpdateProductQuantitiesDtoType = {
  /**
   * @description Фактическое количество принятого товара (Факт)
   * @minLength 0
   * @type number
   */
  factQuantity: number
  /**
   * @description Количество бракованного товара (Брак)
   * @minLength 0
   * @type number
   */
  defects: number
}