import type { AssignResponsiblePersonDtoType } from '../AssignResponsiblePersonDtoType'

export type FFAccountDeliveriesAssignResponsiblePersonPathParamsType = {
  /**
   * @description Идентификатор поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Ответственный сотрудник успешно назначен
 */
export type FFAccountDeliveriesAssignResponsiblePerson200Type = any

/**
 * @description Поставка не найдена
 */
export type FFAccountDeliveriesAssignResponsiblePerson404Type = any

/**
 * @description Данные для назначения ответственного сотрудника
 */
export type FFAccountDeliveriesAssignResponsiblePersonMutationRequestType = AssignResponsiblePersonDtoType

export type FFAccountDeliveriesAssignResponsiblePersonMutationResponseType = FFAccountDeliveriesAssignResponsiblePerson200Type

export type FFAccountDeliveriesAssignResponsiblePersonTypeMutation = {
  Response: FFAccountDeliveriesAssignResponsiblePerson200Type
  Request: FFAccountDeliveriesAssignResponsiblePersonMutationRequestType
  PathParams: FFAccountDeliveriesAssignResponsiblePersonPathParamsType
  Errors: FFAccountDeliveriesAssignResponsiblePerson404Type
}