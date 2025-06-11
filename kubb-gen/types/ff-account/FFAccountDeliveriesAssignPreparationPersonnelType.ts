import type { AssignPreparationPersonnelDtoType } from '../AssignPreparationPersonnelDtoType'

export type FFAccountDeliveriesAssignPreparationPersonnelPathParamsType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
}

/**
 * @description Персонал успешно назначен
 */
export type FFAccountDeliveriesAssignPreparationPersonnel200Type = any

/**
 * @description Неверный статус поставки или некорректные данные
 */
export type FFAccountDeliveriesAssignPreparationPersonnel400Type = any

/**
 * @description Поставка или сотрудник не найден(ы)
 */
export type FFAccountDeliveriesAssignPreparationPersonnel404Type = any

export type FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType = AssignPreparationPersonnelDtoType

export type FFAccountDeliveriesAssignPreparationPersonnelMutationResponseType = FFAccountDeliveriesAssignPreparationPersonnel200Type

export type FFAccountDeliveriesAssignPreparationPersonnelTypeMutation = {
  Response: FFAccountDeliveriesAssignPreparationPersonnel200Type
  Request: FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType
  PathParams: FFAccountDeliveriesAssignPreparationPersonnelPathParamsType
  Errors: FFAccountDeliveriesAssignPreparationPersonnel400Type | FFAccountDeliveriesAssignPreparationPersonnel404Type
}