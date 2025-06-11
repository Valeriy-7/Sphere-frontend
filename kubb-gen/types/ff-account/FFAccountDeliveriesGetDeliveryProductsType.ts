import type { FFDeliveryProductDtoType } from '../FFDeliveryProductDtoType'

export type FFAccountDeliveriesGetDeliveryProductsPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

export type FFAccountDeliveriesGetDeliveryProductsQueryParamsType = {
  /**
   * @description ID поставщика для фильтрации (необязательно)
   * @type string | undefined
   */
  supplierId?: string
}

/**
 * @description Список продуктов
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