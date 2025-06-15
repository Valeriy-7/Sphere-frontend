import type { UpdateProductSizeQuantitiesDtoType } from '../UpdateProductSizeQuantitiesDtoType'

export type FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  deliveryId: string
  /**
   * @description ID продукта
   * @type string, uuid
   */
  productId: string
}

/**
 * @description Количества по размерам успешно обновлены
 */
export type FFAccountDeliveriesUpdateProductSizeQuantities200Type = any

/**
 * @description Ошибка валидации
 */
export type FFAccountDeliveriesUpdateProductSizeQuantities400Type = any

/**
 * @description Поставка или продукт не найден(ы)
 */
export type FFAccountDeliveriesUpdateProductSizeQuantities404Type = any

export type FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType = UpdateProductSizeQuantitiesDtoType

export type FFAccountDeliveriesUpdateProductSizeQuantitiesMutationResponseType = FFAccountDeliveriesUpdateProductSizeQuantities200Type

export type FFAccountDeliveriesUpdateProductSizeQuantitiesTypeMutation = {
  Response: FFAccountDeliveriesUpdateProductSizeQuantities200Type
  Request: FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType
  PathParams: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType
  Errors: FFAccountDeliveriesUpdateProductSizeQuantities400Type | FFAccountDeliveriesUpdateProductSizeQuantities404Type
}