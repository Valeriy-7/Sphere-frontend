import type { DeliveryGroupDetailDtoType } from '../DeliveryGroupDetailDtoType'
import type { UpdateDeliveryGroupDtoType } from '../UpdateDeliveryGroupDtoType'

export type DeliveryGroupsUpdateDeliveryGroupPathParamsType = {
  /**
   * @type string
   */
  groupId: string
}

/**
 * @description Группа поставок успешно обновлена
 */
export type DeliveryGroupsUpdateDeliveryGroup200Type = DeliveryGroupDetailDtoType

/**
 * @description Некорректные данные
 */
export type DeliveryGroupsUpdateDeliveryGroup400Type = any

/**
 * @description Группа не найдена
 */
export type DeliveryGroupsUpdateDeliveryGroup404Type = any

export type DeliveryGroupsUpdateDeliveryGroupMutationRequestType = UpdateDeliveryGroupDtoType

export type DeliveryGroupsUpdateDeliveryGroupMutationResponseType = DeliveryGroupsUpdateDeliveryGroup200Type

export type DeliveryGroupsUpdateDeliveryGroupTypeMutation = {
  Response: DeliveryGroupsUpdateDeliveryGroup200Type
  Request: DeliveryGroupsUpdateDeliveryGroupMutationRequestType
  PathParams: DeliveryGroupsUpdateDeliveryGroupPathParamsType
  Errors: DeliveryGroupsUpdateDeliveryGroup400Type | DeliveryGroupsUpdateDeliveryGroup404Type
}