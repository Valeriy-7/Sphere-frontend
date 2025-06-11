import type { UpdateProductLocationDtoType } from '../UpdateProductLocationDtoType'

export type FFAccountDeliveriesUpdateProductStorageLocationPathParamsType = {
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
 * @description Место хранения успешно обновлено
 */
export type FFAccountDeliveriesUpdateProductStorageLocation200Type = any

/**
 * @description Поставка или продукт не найден(ы)
 */
export type FFAccountDeliveriesUpdateProductStorageLocation404Type = any

export type FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType = UpdateProductLocationDtoType

export type FFAccountDeliveriesUpdateProductStorageLocationMutationResponseType = FFAccountDeliveriesUpdateProductStorageLocation200Type

export type FFAccountDeliveriesUpdateProductStorageLocationTypeMutation = {
  Response: FFAccountDeliveriesUpdateProductStorageLocation200Type
  Request: FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType
  PathParams: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType
  Errors: FFAccountDeliveriesUpdateProductStorageLocation404Type
}