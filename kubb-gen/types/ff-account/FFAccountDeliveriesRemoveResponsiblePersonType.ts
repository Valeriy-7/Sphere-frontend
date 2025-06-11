export type FFAccountDeliveriesRemoveResponsiblePersonPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
  /**
   * @description ID ответственного сотрудника для удаления
   * @type string, uuid
   */
  responsibleId: string
}

/**
 * @description Ответственный сотрудник успешно удален
 */
export type FFAccountDeliveriesRemoveResponsiblePerson200Type = any

/**
 * @description Поставка или сотрудник не найдены
 */
export type FFAccountDeliveriesRemoveResponsiblePerson404Type = any

export type FFAccountDeliveriesRemoveResponsiblePersonMutationResponseType = FFAccountDeliveriesRemoveResponsiblePerson200Type

export type FFAccountDeliveriesRemoveResponsiblePersonTypeMutation = {
  Response: FFAccountDeliveriesRemoveResponsiblePerson200Type
  PathParams: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType
  Errors: FFAccountDeliveriesRemoveResponsiblePerson404Type
}