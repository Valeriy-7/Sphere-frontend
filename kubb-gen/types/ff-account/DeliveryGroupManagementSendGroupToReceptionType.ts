import type { SendGroupToReceptionDtoType } from '../SendGroupToReceptionDtoType'

/**
 * @description Группа поставок успешно отправлена в приемку
 */
export type DeliveryGroupManagementSendGroupToReception200Type = any

/**
 * @description Некорректные данные запроса или поставки не в статусе \"Новые\"
 */
export type DeliveryGroupManagementSendGroupToReception400Type = any

/**
 * @description Поставки не найдены
 */
export type DeliveryGroupManagementSendGroupToReception404Type = any

/**
 * @description Данные для отправки группы в приемку
 */
export type DeliveryGroupManagementSendGroupToReceptionMutationRequestType = SendGroupToReceptionDtoType

export type DeliveryGroupManagementSendGroupToReceptionMutationResponseType = DeliveryGroupManagementSendGroupToReception200Type

export type DeliveryGroupManagementSendGroupToReceptionTypeMutation = {
  Response: DeliveryGroupManagementSendGroupToReception200Type
  Request: DeliveryGroupManagementSendGroupToReceptionMutationRequestType
  Errors: DeliveryGroupManagementSendGroupToReception400Type | DeliveryGroupManagementSendGroupToReception404Type
}