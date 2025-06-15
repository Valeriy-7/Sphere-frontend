import { deliveryGroupDetailDtoSchema } from '../deliveryGroupDetailDtoSchema'
import { z } from 'zod'

export const deliveryGroupsGetDeliveryGroupByIdPathParamsSchema = z.object({
  groupId: z.string(),
})

/**
 * @description Детали группы поставок
 */
export const deliveryGroupsGetDeliveryGroupById200Schema = z.lazy(() => deliveryGroupDetailDtoSchema)

/**
 * @description Группа не найдена
 */
export const deliveryGroupsGetDeliveryGroupById404Schema = z.any()

export const deliveryGroupsGetDeliveryGroupByIdQueryResponseSchema = z.lazy(() => deliveryGroupsGetDeliveryGroupById200Schema)