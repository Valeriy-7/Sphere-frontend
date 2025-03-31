export const deliveryPointDtoTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const

export type DeliveryPointDtoTypeEnumType = (typeof deliveryPointDtoTypeEnum)[keyof typeof deliveryPointDtoTypeEnum]

export type DeliveryPointDtoType = {
  /**
   * @description Название точки доставки
   * @type string
   */
  name: string
  /**
   * @description Идентификатор точки доставки
   * @type string
   */
  id: string
  /**
   * @description Тип точки доставки
   * @type string
   */
  type: DeliveryPointDtoTypeEnumType
  /**
   * @description Флаг, указывающий является ли фулфилмент партнером текущего кабинета
   * @type boolean | undefined
   */
  isPartner?: boolean
  /**
   * @description Адрес точки доставки
   * @type string | undefined
   */
  address?: string
}