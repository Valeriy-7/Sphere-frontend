import type { DeliveryGroupListItemDtoType } from '../DeliveryGroupListItemDtoType'

/**
 * @description Список групп поставок
 */
export type DeliveryGroupsGetDeliveryGroups200Type = DeliveryGroupListItemDtoType[]

export type DeliveryGroupsGetDeliveryGroupsQueryResponseType = DeliveryGroupsGetDeliveryGroups200Type

export type DeliveryGroupsGetDeliveryGroupsTypeQuery = {
  Response: DeliveryGroupsGetDeliveryGroups200Type
  Errors: any
}