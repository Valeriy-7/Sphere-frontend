import { sendGroupToReceptionDtoSchema } from '../sendGroupToReceptionDtoSchema'
import { z } from 'zod'

export const deliveryGroupsSendGroupToReceptionPathParamsSchema = z.object({
  groupId: z.string(),
})

/**
 * @description Группа успешно отправлена в приемку
 */
export const deliveryGroupsSendGroupToReception204Schema = z.any()

/**
 * @description Группа уже отправлена или пуста
 */
export const deliveryGroupsSendGroupToReception400Schema = z.any()

/**
 * @description Группа не найдена
 */
export const deliveryGroupsSendGroupToReception404Schema = z.any()

export const deliveryGroupsSendGroupToReceptionMutationRequestSchema = z.lazy(() => sendGroupToReceptionDtoSchema)

export const deliveryGroupsSendGroupToReceptionMutationResponseSchema = z.lazy(() => deliveryGroupsSendGroupToReception204Schema)