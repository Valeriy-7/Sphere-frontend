export type FFAccountDeliveriesUpdateResponsiblePersonPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Ответственный сотрудник успешно назначен
 */
export type FFAccountDeliveriesUpdateResponsiblePerson200Type = any

/**
 * @description Поставка или сотрудник не найдены
 */
export type FFAccountDeliveriesUpdateResponsiblePerson404Type = any

/**
 * @description ID ответственного сотрудника
 */
export type FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType = {
  /**
   * @description ID ответственного сотрудника
   * @type string, uuid
   */
  responsiblePersonId: string
}

export type FFAccountDeliveriesUpdateResponsiblePersonMutationResponseType = FFAccountDeliveriesUpdateResponsiblePerson200Type

export type FFAccountDeliveriesUpdateResponsiblePersonTypeMutation = {
  Response: FFAccountDeliveriesUpdateResponsiblePerson200Type
  Request: FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType
  PathParams: FFAccountDeliveriesUpdateResponsiblePersonPathParamsType
  Errors: FFAccountDeliveriesUpdateResponsiblePerson404Type
}