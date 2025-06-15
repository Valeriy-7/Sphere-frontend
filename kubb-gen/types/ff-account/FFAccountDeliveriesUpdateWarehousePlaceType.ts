import type { UpdateWarehousePlaceDtoType } from '../UpdateWarehousePlaceDtoType'

export type FFAccountDeliveriesUpdateWarehousePlacePathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Место хранения успешно обновлено
 */
export type FFAccountDeliveriesUpdateWarehousePlace200Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesUpdateWarehousePlace404Type = any

export type FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType = UpdateWarehousePlaceDtoType

export type FFAccountDeliveriesUpdateWarehousePlaceMutationResponseType = FFAccountDeliveriesUpdateWarehousePlace200Type

export type FFAccountDeliveriesUpdateWarehousePlaceTypeMutation = {
  Response: FFAccountDeliveriesUpdateWarehousePlace200Type
  Request: FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType
  PathParams: FFAccountDeliveriesUpdateWarehousePlacePathParamsType
  Errors: FFAccountDeliveriesUpdateWarehousePlace404Type
}