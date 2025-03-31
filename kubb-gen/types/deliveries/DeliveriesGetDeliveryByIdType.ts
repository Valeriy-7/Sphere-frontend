import type { DeliveryType } from '../DeliveryType'

export type DeliveriesGetDeliveryByIdPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Информация о поставке успешно получена
 */
export type DeliveriesGetDeliveryById200Type = DeliveryType

/**
 * @description Поставка не найдена
 */
export type DeliveriesGetDeliveryById404Type = any

export type DeliveriesGetDeliveryByIdQueryResponseType = DeliveriesGetDeliveryById200Type

export type DeliveriesGetDeliveryByIdTypeQuery = {
  Response: DeliveriesGetDeliveryById200Type
  PathParams: DeliveriesGetDeliveryByIdPathParamsType
  Errors: DeliveriesGetDeliveryById404Type
}