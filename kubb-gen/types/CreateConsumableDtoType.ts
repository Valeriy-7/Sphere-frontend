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
   * @description Описание расходника
   * @type string
   */
  description: string
  /**
   * @description Порядковый номер
   * @type number | undefined
   */
  number?: number
  /**
   * @description Изображение расходника
   * @type string, binary
   */
  image: Blob
}