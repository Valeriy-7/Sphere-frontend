export const logisticsFromPointTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const

export type LogisticsFromPointTypeEnumType = (typeof logisticsFromPointTypeEnum)[keyof typeof logisticsFromPointTypeEnum]

export const logisticsToPointTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const

export type LogisticsToPointTypeEnumType = (typeof logisticsToPointTypeEnum)[keyof typeof logisticsToPointTypeEnum]

export type LogisticsType = {
  /**
   * @description ID записи логистики
   * @type string
   */
  id: string
  /**
   * @description Номер записи логистики
   * @type number
   */
  number: number
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
  /**
   * @description ID точки отправления
   * @type string
   */
  fromPointId: string
  /**
   * @description ID точки назначения
   * @type string
   */
  toPointId: string
  /**
   * @description Тип точки отправления
   * @type string
   */
  fromPointType: LogisticsFromPointTypeEnumType
  /**
   * @description Тип точки назначения
   * @type string
   */
  toPointType: LogisticsToPointTypeEnumType
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
   * @description Описание маршрута
   * @type string
   */
  description: string
  /**
   * @description Дата создания
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description Дата обновления
   * @type string, date-time
   */
  updatedAt: string
}