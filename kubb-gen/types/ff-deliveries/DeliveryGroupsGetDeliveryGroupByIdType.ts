import type { DeliveryGroupDetailDtoType } from '../DeliveryGroupDetailDtoType'

export type DeliveryGroupsGetDeliveryGroupByIdPathParamsType = {
  /**
   * @type string
   */
  groupId: string
}

/**
 * @description Детали группы поставок
 */
export type DeliveryGroupsGetDeliveryGroupById200Type = DeliveryGroupDetailDtoType

/**
 * @description Группа не найдена
 */
export type DeliveryGroupsGetDeliveryGroupById404Type = any

export type DeliveryGroupsGetDeliveryGroupByIdQueryResponseType = DeliveryGroupsGetDeliveryGroupById200Type

export type DeliveryGroupsGetDeliveryGroupByIdTypeQuery = {
  Response: DeliveryGroupsGetDeliveryGroupById200Type
  PathParams: DeliveryGroupsGetDeliveryGroupByIdPathParamsType
  Errors: DeliveryGroupsGetDeliveryGroupById404Type
}