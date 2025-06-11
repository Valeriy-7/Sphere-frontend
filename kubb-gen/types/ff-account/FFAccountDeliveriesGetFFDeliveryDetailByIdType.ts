import type { FFDeliveryDetailWithRoutesDtoType } from '../FFDeliveryDetailWithRoutesDtoType'

export type FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Детали поставки успешно получены
 */
export type FFAccountDeliveriesGetFFDeliveryDetailById200Type = FFDeliveryDetailWithRoutesDtoType

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesGetFFDeliveryDetailById404Type = any

export type FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType = FFAccountDeliveriesGetFFDeliveryDetailById200Type

export type FFAccountDeliveriesGetFFDeliveryDetailByIdTypeQuery = {
  Response: FFAccountDeliveriesGetFFDeliveryDetailById200Type
  PathParams: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType
  Errors: FFAccountDeliveriesGetFFDeliveryDetailById404Type
}