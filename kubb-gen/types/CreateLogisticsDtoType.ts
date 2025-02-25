export const createLogisticsDtoFromPointTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const

export type CreateLogisticsDtoFromPointTypeEnumType = (typeof createLogisticsDtoFromPointTypeEnum)[keyof typeof createLogisticsDtoFromPointTypeEnum]

export const createLogisticsDtoToPointTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const

export type CreateLogisticsDtoToPointTypeEnumType = (typeof createLogisticsDtoToPointTypeEnum)[keyof typeof createLogisticsDtoToPointTypeEnum]

export type CreateLogisticsDtoType = {
  /**
   * @description ID точки отправления
   * @type string
   */
  fromPointId: string
  /**
   * @description Тип точки отправления
   * @type string
   */
  fromPointType: CreateLogisticsDtoFromPointTypeEnumType
  /**
   * @description ID точки назначения
   * @type string
   */
  toPointId: string
  /**
   * @description Тип точки назначения
   * @type string
   */
  toPointType: CreateLogisticsDtoToPointTypeEnumType
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
   * @type string | undefined
   */
  description?: string
}