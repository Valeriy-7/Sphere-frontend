import type { DeliveryPointDtoType } from '../DeliveryPointDtoType'

/**
 * @description Полный список точек доставки
 */
export type DeliveryPointsGetAllDeliveryPoints200Type = DeliveryPointDtoType[]

export type DeliveryPointsGetAllDeliveryPointsQueryResponseType = DeliveryPointsGetAllDeliveryPoints200Type

export type DeliveryPointsGetAllDeliveryPointsTypeQuery = {
  Response: DeliveryPointsGetAllDeliveryPoints200Type
  Errors: any
}