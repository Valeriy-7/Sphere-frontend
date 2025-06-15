import type { UpdateReadyStatusDtoType } from '../UpdateReadyStatusDtoType'

export type FFAccountDeliveriesUpdateReadyStatusPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Статус готовности успешно обновлен
 */
export type FFAccountDeliveriesUpdateReadyStatus200Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesUpdateReadyStatus404Type = any

export type FFAccountDeliveriesUpdateReadyStatusMutationRequestType = UpdateReadyStatusDtoType

export type FFAccountDeliveriesUpdateReadyStatusMutationResponseType = FFAccountDeliveriesUpdateReadyStatus200Type

export type FFAccountDeliveriesUpdateReadyStatusTypeMutation = {
  Response: FFAccountDeliveriesUpdateReadyStatus200Type
  Request: FFAccountDeliveriesUpdateReadyStatusMutationRequestType
  PathParams: FFAccountDeliveriesUpdateReadyStatusPathParamsType
  Errors: FFAccountDeliveriesUpdateReadyStatus404Type
}