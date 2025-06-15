import { deliveryGroupDetailDtoSchema } from '../deliveryGroupDetailDtoSchema'
import { updateDeliveryGroupDtoSchema } from '../updateDeliveryGroupDtoSchema'
import { z } from 'zod'

export const deliveryGroupsUpdateDeliveryGroupPathParamsSchema = z.object({
  groupId: z.string(),
})

/**
 * @description Группа поставок успешно обновлена
 */
export const deliveryGroupsUpdateDeliveryGroup200Schema = z.lazy(() => deliveryGroupDetailDtoSchema)

/**
 * @description Некорректные данные
 */
export const deliveryGroupsUpdateDeliveryGroup400Schema = z.any()

/**
 * @description Группа не найдена
 */
export const deliveryGroupsUpdateDeliveryGroup404Schema = z.any()

export const deliveryGroupsUpdateDeliveryGroupMutationRequestSchema = z.lazy(() => updateDeliveryGroupDtoSchema)

export const deliveryGroupsUpdateDeliveryGroupMutationResponseSchema = z.lazy(() => deliveryGroupsUpdateDeliveryGroup200Schema)