export type LogisticsType = {
  /**
   * @description ID записи логистики
   * @type string
   */
  id: string
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
  /**
   * @description Порядковый номер
   * @type number
   */
  number: number
  /**
   * @description Пункт отправления
   * @type string
   */
  fromLocation: string
  /**
   * @description Адрес отправления
   * @type string
   */
  fromAddress: string
  /**
   * @description Пункт назначения
   * @type string
   */
  toLocation: string
  /**
   * @description Адрес назначения
   * @type string
   */
  toAddress: string
  /**
   * @description Цена за объем до 1 м³
   * @type number
   */
  priceUpTo1m3: number
  /**
   * @description Цена за 1 м³
   * @type number
   */
  pricePer1m3: number
  /**
   * @description Комментарий
   * @type string
   */
  comment: string
}