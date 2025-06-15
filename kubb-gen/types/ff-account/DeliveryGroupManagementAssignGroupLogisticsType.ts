import type { AssignGroupLogisticsDtoType } from '../AssignGroupLogisticsDtoType'

/**
 * @description Тип логистики успешно назначен
 */
export type DeliveryGroupManagementAssignGroupLogistics200Type = any

/**
 * @description Некорректные данные запроса или поставки не в статусе \"Новые\"
 */
export type DeliveryGroupManagementAssignGroupLogistics400Type = any

/**
 * @description Поставки или тип логистики не найдены
 */
export type DeliveryGroupManagementAssignGroupLogistics404Type = any

/**
 * @description Данные для назначения типа логистики
 */
export type DeliveryGroupManagementAssignGroupLogisticsMutationRequestType = AssignGroupLogisticsDtoType

export type DeliveryGroupManagementAssignGroupLogisticsMutationResponseType = DeliveryGroupManagementAssignGroupLogistics200Type

export type DeliveryGroupManagementAssignGroupLogisticsTypeMutation = {
  Response: DeliveryGroupManagementAssignGroupLogistics200Type
  Request: DeliveryGroupManagementAssignGroupLogisticsMutationRequestType
  Errors: DeliveryGroupManagementAssignGroupLogistics400Type | DeliveryGroupManagementAssignGroupLogistics404Type
}