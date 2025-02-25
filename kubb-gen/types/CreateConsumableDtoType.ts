export type CreateConsumableDtoType = {
  /**
   * @description Название расходника
   * @type string
   */
  name: string
  /**
   * @description Цена за единицу
   * @type number
   */
  price: number
  /**
   * @description Количество в наличии
   * @type number
   */
  quantity: number
  /**
   * @description Описание расходника
   * @type string
   */
  description: string
  /**
   * @description Порядковый номер (генерируется автоматически)
   * @type number | undefined
   */
  number?: number
  /**
   * @description Изображение расходника
   * @type string, binary
   */
  image: Blob
}