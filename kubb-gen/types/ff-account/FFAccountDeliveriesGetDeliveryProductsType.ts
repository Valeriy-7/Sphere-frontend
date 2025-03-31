import type { FFDeliveryProductDtoType } from '../FFDeliveryProductDtoType'

export type FFAccountDeliveriesGetDeliveryProductsPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
}

export type FFAccountDeliveriesGetDeliveryProductsQueryParamsType = {
  /**
   * @description Фильтр по идентификатору поставщика
   * @type string | undefined, uuid
   */
  supplierId?: string
}

/**
 * @description Список товаров поставки
 */
export type FFAccountDeliveriesGetDeliveryProducts200Type = FFDeliveryProductDtoType[]

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesGetDeliveryProducts404Type = any

export type FFAccountDeliveriesGetDeliveryProductsQueryResponseType = FFAccountDeliveriesGetDeliveryProducts200Type

export type FFAccountDeliveriesGetDeliveryProductsTypeQuery = {
  Response: FFAccountDeliveriesGetDeliveryProducts200Type
  PathParams: FFAccountDeliveriesGetDeliveryProductsPathParamsType
  QueryParams: FFAccountDeliveriesGetDeliveryProductsQueryParamsType
  Errors: FFAccountDeliveriesGetDeliveryProducts404Type
}