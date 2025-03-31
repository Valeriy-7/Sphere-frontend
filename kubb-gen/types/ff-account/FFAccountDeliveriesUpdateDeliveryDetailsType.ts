import type { UpdateDeliveryDetailsDtoType } from '../UpdateDeliveryDetailsDtoType'

export type FFAccountDeliveriesUpdateDeliveryDetailsPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Детали поставки успешно обновлены
 */
export type FFAccountDeliveriesUpdateDeliveryDetails200Type = any

/**
 * @description Поставка или логист не найдены
 */
export type FFAccountDeliveriesUpdateDeliveryDetails404Type = any

/**
 * @description Данные для обновления деталей поставки
 */
export type FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType = UpdateDeliveryDetailsDtoType

export type FFAccountDeliveriesUpdateDeliveryDetailsMutationResponseType = FFAccountDeliveriesUpdateDeliveryDetails200Type

export type FFAccountDeliveriesUpdateDeliveryDetailsTypeMutation = {
  Response: FFAccountDeliveriesUpdateDeliveryDetails200Type
  Request: FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType
  PathParams: FFAccountDeliveriesUpdateDeliveryDetailsPathParamsType
  Errors: FFAccountDeliveriesUpdateDeliveryDetails404Type
}