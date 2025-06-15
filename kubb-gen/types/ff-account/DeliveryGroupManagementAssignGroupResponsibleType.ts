import type { AssignGroupResponsibleDtoType } from '../AssignGroupResponsibleDtoType'

/**
 * @description Ответственные успешно назначены
 */
export type DeliveryGroupManagementAssignGroupResponsible200Type = any

/**
 * @description Некорректные данные запроса или поставки не в статусе \"Новые\"
 */
export type DeliveryGroupManagementAssignGroupResponsible400Type = any

/**
 * @description Поставки или ответственные сотрудники не найдены
 */
export type DeliveryGroupManagementAssignGroupResponsible404Type = any

/**
 * @description Данные для назначения ответственных
 */
export type DeliveryGroupManagementAssignGroupResponsibleMutationRequestType = AssignGroupResponsibleDtoType

export type DeliveryGroupManagementAssignGroupResponsibleMutationResponseType = DeliveryGroupManagementAssignGroupResponsible200Type

export type DeliveryGroupManagementAssignGroupResponsibleTypeMutation = {
  Response: DeliveryGroupManagementAssignGroupResponsible200Type
  Request: DeliveryGroupManagementAssignGroupResponsibleMutationRequestType
  Errors: DeliveryGroupManagementAssignGroupResponsible400Type | DeliveryGroupManagementAssignGroupResponsible404Type
}