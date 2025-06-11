export type FFAccountDeliveriesAddResponsiblePersonPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Ответственный сотрудник успешно добавлен
 */
export type FFAccountDeliveriesAddResponsiblePerson200Type = any

/**
 * @description Поставка или сотрудник не найдены
 */
export type FFAccountDeliveriesAddResponsiblePerson404Type = any

/**
 * @description ID ответственного сотрудника для добавления
 */
export type FFAccountDeliveriesAddResponsiblePersonMutationRequestType = {
  /**
   * @description ID ответственного сотрудника
   * @type string, uuid
   */
  responsiblePersonId: string
}

export type FFAccountDeliveriesAddResponsiblePersonMutationResponseType = FFAccountDeliveriesAddResponsiblePerson200Type

export type FFAccountDeliveriesAddResponsiblePersonTypeMutation = {
  Response: FFAccountDeliveriesAddResponsiblePerson200Type
  Request: FFAccountDeliveriesAddResponsiblePersonMutationRequestType
  PathParams: FFAccountDeliveriesAddResponsiblePersonPathParamsType
  Errors: FFAccountDeliveriesAddResponsiblePerson404Type
}