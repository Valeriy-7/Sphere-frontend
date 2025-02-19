export type CreateLogisticsDtoType = {
  /**
   * @description Место отправления
   * @type string
   */
  fromLocation: string
  /**
   * @description Адрес отправления
   * @type string
   */
  fromAddress: string
  /**
   * @description Место назначения
   * @type string
   */
  toLocation: string
  /**
   * @description Адрес назначения
   * @type string
   */
  toAddress: string
  /**
   * @description Цена до 1м3
   * @type number
   */
  priceUpTo1m3: number
  /**
   * @description Цена за 1м3
   * @type number
   */
  pricePer1m3: number
  /**
   * @description Комментарий
   * @type string | undefined
   */
  comment?: string
  /**
   * @description Порядковый номер
   * @type number | undefined
   */
  number?: number
}