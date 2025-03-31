import type { FFDeliveryProductDtoType } from '../FFDeliveryProductDtoType'

export type FFDeliveriesGetFFDeliveryProductsPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

export type FFDeliveriesGetFFDeliveryProductsQueryParamsType = {
  /**
   * @description Фильтр по ID поставщика
   * @type string | undefined, uuid
   */
  supplierId?: string
}

/**
 * @description Список товаров в поставке на ФФ успешно получен
 */
export type FFDeliveriesGetFFDeliveryProducts200Type = FFDeliveryProductDtoType[]

/**
 * @description Неверный запрос (например, неверный формат UUID)
 */
export type FFDeliveriesGetFFDeliveryProducts400Type = any

/**
 * @description Не авторизован
 */
export type FFDeliveriesGetFFDeliveryProducts401Type = any

/**
 * @description Поставка не найдена
 * @example [object Object]
 */
export type FFDeliveriesGetFFDeliveryProducts404Type = any

export type FFDeliveriesGetFFDeliveryProductsQueryResponseType = FFDeliveriesGetFFDeliveryProducts200Type

export type FFDeliveriesGetFFDeliveryProductsTypeQuery = {
  Response: FFDeliveriesGetFFDeliveryProducts200Type
  PathParams: FFDeliveriesGetFFDeliveryProductsPathParamsType
  QueryParams: FFDeliveriesGetFFDeliveryProductsQueryParamsType
  Errors: FFDeliveriesGetFFDeliveryProducts400Type | FFDeliveriesGetFFDeliveryProducts401Type | FFDeliveriesGetFFDeliveryProducts404Type
}