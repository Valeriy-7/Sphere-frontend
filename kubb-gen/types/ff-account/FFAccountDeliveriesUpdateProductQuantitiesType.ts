import type { UpdateProductQuantitiesDtoType } from '../UpdateProductQuantitiesDtoType'

export type FFAccountDeliveriesUpdateProductQuantitiesPathParamsType = {
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
 * @description Количества успешно обновлены
 */
export type FFAccountDeliveriesUpdateProductQuantities200Type = any

/**
 * @description Ошибка валидации (Факт+Брак != План или отрицательные значения)
 */
export type FFAccountDeliveriesUpdateProductQuantities400Type = any

/**
 * @description Поставка или продукт не найден(ы)
 */
export type FFAccountDeliveriesUpdateProductQuantities404Type = any

export type FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType = UpdateProductQuantitiesDtoType

export type FFAccountDeliveriesUpdateProductQuantitiesMutationResponseType = FFAccountDeliveriesUpdateProductQuantities200Type

export type FFAccountDeliveriesUpdateProductQuantitiesTypeMutation = {
  Response: FFAccountDeliveriesUpdateProductQuantities200Type
  Request: FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType
  PathParams: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType
  Errors: FFAccountDeliveriesUpdateProductQuantities400Type | FFAccountDeliveriesUpdateProductQuantities404Type
}