export type FFAccountDeliveriesCompleteReceptionPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Приемка успешно завершена, статус обновлен
 */
export type FFAccountDeliveriesCompleteReception200Type = any

/**
 * @description Невозможно завершить приемку (неверный статус и т.д.)
 */
export type FFAccountDeliveriesCompleteReception400Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesCompleteReception404Type = any

export type FFAccountDeliveriesCompleteReceptionMutationResponseType = FFAccountDeliveriesCompleteReception200Type

export type FFAccountDeliveriesCompleteReceptionTypeMutation = {
  Response: FFAccountDeliveriesCompleteReception200Type
  PathParams: FFAccountDeliveriesCompleteReceptionPathParamsType
  Errors: FFAccountDeliveriesCompleteReception400Type | FFAccountDeliveriesCompleteReception404Type
}