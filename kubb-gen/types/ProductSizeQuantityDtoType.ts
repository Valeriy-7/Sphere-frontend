export type ProductSizeQuantityDtoType = {
  /**
   * @description Ключ размера (например: \"S (42)_0\")
   * @type string
   */
  sizeKey: string
  /**
   * @description Отображаемое название размера (например: \"S (42)\")
   * @type string
   */
  sizeDisplay: string
  /**
   * @description Размер WB (например: \"S\")
   * @type string | undefined
   */
  wbSize?: string
  /**
   * @description Технический размер (например: \"42\")
   * @type string | undefined
   */
  techSize?: string
  /**
   * @description Фактическое количество для данного размера
   * @minLength 0
   * @type number
   */
  factQuantity: number
  /**
   * @description Количество брака для данного размера
   * @minLength 0
   * @type number
   */
  defects: number
}