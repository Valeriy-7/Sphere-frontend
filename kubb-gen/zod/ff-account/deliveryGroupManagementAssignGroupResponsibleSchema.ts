import { assignGroupResponsibleDtoSchema } from '../assignGroupResponsibleDtoSchema'
import { z } from 'zod'

/**
 * @description Ответственные успешно назначены
 */
export const deliveryGroupManagementAssignGroupResponsible200Schema = z.any()

/**
 * @description Некорректные данные запроса или поставки не в статусе \"Новые\"
 */
export const deliveryGroupManagementAssignGroupResponsible400Schema = z.any()

/**
 * @description Поставки или ответственные сотрудники не найдены
 */
export const deliveryGroupManagementAssignGroupResponsible404Schema = z.any()

/**
 * @description Данные для назначения ответственных
 */
export const deliveryGroupManagementAssignGroupResponsibleMutationRequestSchema = z.lazy(() => assignGroupResponsibleDtoSchema)

export const deliveryGroupManagementAssignGroupResponsibleMutationResponseSchema = z.lazy(() => deliveryGroupManagementAssignGroupResponsible200Schema)