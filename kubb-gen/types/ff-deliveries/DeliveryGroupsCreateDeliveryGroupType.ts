import type { CreateDeliveryGroupDtoType } from '../CreateDeliveryGroupDtoType'
import type { DeliveryGroupDetailDtoType } from '../DeliveryGroupDetailDtoType'

/**
 * @description Группа поставок успешно создана
 */
export type DeliveryGroupsCreateDeliveryGroup201Type = DeliveryGroupDetailDtoType

/**
 * @description Некорректные данные
 */
export type DeliveryGroupsCreateDeliveryGroup400Type = any

/**
 * @description Поставки не найдены
 */
export type DeliveryGroupsCreateDeliveryGroup404Type = any

export type DeliveryGroupsCreateDeliveryGroupMutationRequestType = CreateDeliveryGroupDtoType

export type DeliveryGroupsCreateDeliveryGroupMutationResponseType = DeliveryGroupsCreateDeliveryGroup201Type

export type DeliveryGroupsCreateDeliveryGroupTypeMutation = {
  Response: DeliveryGroupsCreateDeliveryGroup201Type
  Request: DeliveryGroupsCreateDeliveryGroupMutationRequestType
  Errors: DeliveryGroupsCreateDeliveryGroup400Type | DeliveryGroupsCreateDeliveryGroup404Type
}