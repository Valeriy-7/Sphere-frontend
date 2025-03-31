import type { ProductDetailsDtoType } from '../ProductDetailsDtoType'

export type WbGetProductPathParamsType = {
  /**
   * @description ID продукта
   * @type string
   */
  id: string
}

export type WbGetProductQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
}

/**
 * @description Информация о продукте успешно получена
 */
export type WbGetProduct200Type = ProductDetailsDtoType

export type WbGetProductQueryResponseType = WbGetProduct200Type

export type WbGetProductTypeQuery = {
  Response: WbGetProduct200Type
  PathParams: WbGetProductPathParamsType
  QueryParams: WbGetProductQueryParamsType
  Errors: any
}