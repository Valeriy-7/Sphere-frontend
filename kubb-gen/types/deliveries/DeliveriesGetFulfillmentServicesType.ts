import type { ServiceType } from '../ServiceType'

/**
 * @description Список услуг успешно получен
 */
export type DeliveriesGetFulfillmentServices200Type = ServiceType[]

/**
 * @description Не авторизован
 */
export type DeliveriesGetFulfillmentServices401Type = any

export type DeliveriesGetFulfillmentServicesQueryResponseType = DeliveriesGetFulfillmentServices200Type

export type DeliveriesGetFulfillmentServicesTypeQuery = {
  Response: DeliveriesGetFulfillmentServices200Type
  Errors: DeliveriesGetFulfillmentServices401Type
}