import type { FFDeliveryProductDtoType } from '../FFDeliveryProductDtoType'

export type FFDeliveriesGetFFRouteSupplierProductsPathParamsType = {
  /**
   * @description ID маршрута
   * @type string, uuid
   */
  routeId: string
  /**
   * @description ID поставщика
   * @type string, uuid
   */
  supplierId: string
}

/**
 * @description Список товаров по маршруту и поставщику успешно получен
 */
export type FFDeliveriesGetFFRouteSupplierProducts200Type = FFDeliveryProductDtoType[]

/**
 * @description Не авторизован
 */
export type FFDeliveriesGetFFRouteSupplierProducts401Type = any

/**
 * @description Товары не найдены
 */
export type FFDeliveriesGetFFRouteSupplierProducts404Type = any

export type FFDeliveriesGetFFRouteSupplierProductsQueryResponseType = FFDeliveriesGetFFRouteSupplierProducts200Type

export type FFDeliveriesGetFFRouteSupplierProductsTypeQuery = {
  Response: FFDeliveriesGetFFRouteSupplierProducts200Type
  PathParams: FFDeliveriesGetFFRouteSupplierProductsPathParamsType
  Errors: FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type
}