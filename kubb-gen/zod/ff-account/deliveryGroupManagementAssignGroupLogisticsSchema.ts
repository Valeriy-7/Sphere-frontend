import { assignGroupLogisticsDtoSchema } from '../assignGroupLogisticsDtoSchema'
import { z } from 'zod'

/**
 * @description Тип логистики успешно назначен
 */
export const deliveryGroupManagementAssignGroupLogistics200Schema = z.any()

/**
 * @description Некорректные данные запроса или поставки не в статусе \"Новые\"
 */
export const deliveryGroupManagementAssignGroupLogistics400Schema = z.any()

/**
 * @description Поставки или тип логистики не найдены
 */
export const deliveryGroupManagementAssignGroupLogistics404Schema = z.any()

/**
 * @description Данные для назначения типа логистики
 */
export const deliveryGroupManagementAssignGroupLogisticsMutationRequestSchema = z.lazy(() => assignGroupLogisticsDtoSchema)

export const deliveryGroupManagementAssignGroupLogisticsMutationResponseSchema = z.lazy(() => deliveryGroupManagementAssignGroupLogistics200Schema)