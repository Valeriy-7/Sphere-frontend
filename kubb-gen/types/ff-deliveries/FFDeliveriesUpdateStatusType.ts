import type { DeliveryType } from '../DeliveryType'
import type { UpdateDeliveryStatusDtoType } from '../UpdateDeliveryStatusDtoType'

export type FFDeliveriesUpdateStatusPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Статус поставки успешно обновлен
 */
export type FFDeliveriesUpdateStatus200Type = DeliveryType

export type FFDeliveriesUpdateStatusMutationRequestType = UpdateDeliveryStatusDtoType

export type FFDeliveriesUpdateStatusMutationResponseType = FFDeliveriesUpdateStatus200Type

export type FFDeliveriesUpdateStatusTypeMutation = {
  Response: FFDeliveriesUpdateStatus200Type
  Request: FFDeliveriesUpdateStatusMutationRequestType
  PathParams: FFDeliveriesUpdateStatusPathParamsType
  Errors: any
}