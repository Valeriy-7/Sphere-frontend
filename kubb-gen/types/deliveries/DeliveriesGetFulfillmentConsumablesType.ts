import type { ConsumableType } from '../ConsumableType'

/**
 * @description Список расходных материалов успешно получен
 */
export type DeliveriesGetFulfillmentConsumables200Type = ConsumableType[]

/**
 * @description Не авторизован
 */
export type DeliveriesGetFulfillmentConsumables401Type = any

export type DeliveriesGetFulfillmentConsumablesQueryResponseType = DeliveriesGetFulfillmentConsumables200Type

export type DeliveriesGetFulfillmentConsumablesTypeQuery = {
  Response: DeliveriesGetFulfillmentConsumables200Type
  Errors: DeliveriesGetFulfillmentConsumables401Type
}