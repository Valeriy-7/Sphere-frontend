import type { FFDeliveryProductDtoType } from '../FFDeliveryProductDtoType'

export type FFDeliveriesGetFFRouteProductsPathParamsType = {
  /**
   * @description ID маршрута
   * @type string, uuid
   */
  id: string
}

/**
 * @description Список товаров по маршруту успешно получен
 */
export type FFDeliveriesGetFFRouteProducts200Type = FFDeliveryProductDtoType[]

/**
 * @description Неверный запрос (например, неверный формат UUID)
 */
export type FFDeliveriesGetFFRouteProducts400Type = any

/**
 * @description Не авторизован
 */
export type FFDeliveriesGetFFRouteProducts401Type = any

/**
 * @description Маршрут не найден
 * @example [object Object]
 */
export type FFDeliveriesGetFFRouteProducts404Type = any

export type FFDeliveriesGetFFRouteProductsQueryResponseType = FFDeliveriesGetFFRouteProducts200Type

export type FFDeliveriesGetFFRouteProductsTypeQuery = {
  Response: FFDeliveriesGetFFRouteProducts200Type
  PathParams: FFDeliveriesGetFFRouteProductsPathParamsType
  Errors: FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type
}