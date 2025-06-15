export type FFAccountDeliveriesAssignResponsiblePathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Ответственные успешно назначены
 */
export type FFAccountDeliveriesAssignResponsible200Type = any

/**
 * @description Поставка или сотрудник не найден(ы)
 */
export type FFAccountDeliveriesAssignResponsible404Type = any

/**
 * @description Массив ID ответственных сотрудников
 */
export type FFAccountDeliveriesAssignResponsibleMutationRequestType = {
  /**
   * @type array
   */
  responsibleIds: string[]
}

export type FFAccountDeliveriesAssignResponsibleMutationResponseType = FFAccountDeliveriesAssignResponsible200Type

export type FFAccountDeliveriesAssignResponsibleTypeMutation = {
  Response: FFAccountDeliveriesAssignResponsible200Type
  Request: FFAccountDeliveriesAssignResponsibleMutationRequestType
  PathParams: FFAccountDeliveriesAssignResponsiblePathParamsType
  Errors: FFAccountDeliveriesAssignResponsible404Type
}