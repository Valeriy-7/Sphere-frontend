import type { UpdateProductQuantitiesDtoType } from '../UpdateProductQuantitiesDtoType'

export type FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Количества успешно обновлены
 */
export type FFAccountDeliveriesUpdateDeliveryQuantities200Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesUpdateDeliveryQuantities404Type = any

export type FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType = UpdateProductQuantitiesDtoType

export type FFAccountDeliveriesUpdateDeliveryQuantitiesMutationResponseType = FFAccountDeliveriesUpdateDeliveryQuantities200Type

export type FFAccountDeliveriesUpdateDeliveryQuantitiesTypeMutation = {
  Response: FFAccountDeliveriesUpdateDeliveryQuantities200Type
  Request: FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType
  PathParams: FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsType
  Errors: FFAccountDeliveriesUpdateDeliveryQuantities404Type
}