import type { DeliveryPointDtoType } from '../DeliveryPointDtoType'

export const deliveryPointsControllerGetDeliveryPointsQueryParamsTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const

export type DeliveryPointsGetDeliveryPointsQueryParamsTypeEnumType =
  (typeof deliveryPointsControllerGetDeliveryPointsQueryParamsTypeEnum)[keyof typeof deliveryPointsControllerGetDeliveryPointsQueryParamsTypeEnum]

export type DeliveryPointsGetDeliveryPointsQueryParamsType = {
  /**
   * @description Тип точки доставки
   * @type string | undefined
   */
  type?: DeliveryPointsGetDeliveryPointsQueryParamsTypeEnumType
  /**
   * @description ID кабинета, для которого нужно получить точки доставки
   * @type string | undefined
   */
  cabinetId?: string
  /**
   * @description Флаг для получения только партнерских точек доставки
   * @type boolean | undefined
   */
  onlyPartners?: boolean
}

/**
 * @description Список точек доставки
 */
export type DeliveryPointsGetDeliveryPoints200Type = DeliveryPointDtoType[]

export type DeliveryPointsGetDeliveryPointsQueryResponseType = DeliveryPointsGetDeliveryPoints200Type

export type DeliveryPointsGetDeliveryPointsTypeQuery = {
  Response: DeliveryPointsGetDeliveryPoints200Type
  QueryParams: DeliveryPointsGetDeliveryPointsQueryParamsType
  Errors: any
}