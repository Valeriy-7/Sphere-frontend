import { sendGroupToReceptionDtoSchema } from '../sendGroupToReceptionDtoSchema'
import { z } from 'zod'

/**
 * @description Группа поставок успешно отправлена в приемку
 */
export const deliveryGroupManagementSendGroupToReception200Schema = z.any()

/**
 * @description Некорректные данные запроса или поставки не в статусе \"Новые\"
 */
export const deliveryGroupManagementSendGroupToReception400Schema = z.any()

/**
 * @description Поставки не найдены
 */
export const deliveryGroupManagementSendGroupToReception404Schema = z.any()

/**
 * @description Данные для отправки группы в приемку
 */
export const deliveryGroupManagementSendGroupToReceptionMutationRequestSchema = z.lazy(() => sendGroupToReceptionDtoSchema)

export const deliveryGroupManagementSendGroupToReceptionMutationResponseSchema = z.lazy(() => deliveryGroupManagementSendGroupToReception200Schema)