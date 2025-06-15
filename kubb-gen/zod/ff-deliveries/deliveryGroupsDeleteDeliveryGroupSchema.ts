import { z } from 'zod'

export const deliveryGroupsDeleteDeliveryGroupPathParamsSchema = z.object({
  groupId: z.string(),
})

/**
 * @description Группа успешно удалена
 */
export const deliveryGroupsDeleteDeliveryGroup204Schema = z.any()

/**
 * @description Нельзя удалить отправленную группу
 */
export const deliveryGroupsDeleteDeliveryGroup400Schema = z.any()

/**
 * @description Группа не найдена
 */
export const deliveryGroupsDeleteDeliveryGroup404Schema = z.any()

export const deliveryGroupsDeleteDeliveryGroupMutationResponseSchema = z.lazy(() => deliveryGroupsDeleteDeliveryGroup204Schema)