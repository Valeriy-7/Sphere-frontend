import type { SendGroupToReceptionDtoType } from '../SendGroupToReceptionDtoType'

export type DeliveryGroupsSendGroupToReceptionPathParamsType = {
  /**
   * @type string
   */
  groupId: string
}

/**
 * @description Группа успешно отправлена в приемку
 */
export type DeliveryGroupsSendGroupToReception204Type = any

/**
 * @description Группа уже отправлена или пуста
 */
export type DeliveryGroupsSendGroupToReception400Type = any

/**
 * @description Группа не найдена
 */
export type DeliveryGroupsSendGroupToReception404Type = any

export type DeliveryGroupsSendGroupToReceptionMutationRequestType = SendGroupToReceptionDtoType

export type DeliveryGroupsSendGroupToReceptionMutationResponseType = DeliveryGroupsSendGroupToReception204Type

export type DeliveryGroupsSendGroupToReceptionTypeMutation = {
  Response: DeliveryGroupsSendGroupToReception204Type
  Request: DeliveryGroupsSendGroupToReceptionMutationRequestType
  PathParams: DeliveryGroupsSendGroupToReceptionPathParamsType
  Errors: DeliveryGroupsSendGroupToReception400Type | DeliveryGroupsSendGroupToReception404Type
}