export type FFAccountDeliveriesAssignLogisticsTypePathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Тип логистики успешно назначен
 */
export type FFAccountDeliveriesAssignLogisticsType200Type = any

/**
 * @description Поставка или тип логистики не найден(ы)
 */
export type FFAccountDeliveriesAssignLogisticsType404Type = any

/**
 * @description ID типа логистики
 * @example [object Object]
 */
export type FFAccountDeliveriesAssignLogisticsTypeMutationRequestType = {
  /**
   * @type string, uuid
   */
  logisticsTypeId: string
}

export type FFAccountDeliveriesAssignLogisticsTypeMutationResponseType = FFAccountDeliveriesAssignLogisticsType200Type

export type FFAccountDeliveriesAssignLogisticsTypeTypeMutation = {
  Response: FFAccountDeliveriesAssignLogisticsType200Type
  Request: FFAccountDeliveriesAssignLogisticsTypeMutationRequestType
  PathParams: FFAccountDeliveriesAssignLogisticsTypePathParamsType
  Errors: FFAccountDeliveriesAssignLogisticsType404Type
}