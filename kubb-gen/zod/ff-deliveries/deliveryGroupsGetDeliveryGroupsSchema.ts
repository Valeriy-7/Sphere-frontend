import { deliveryGroupListItemDtoSchema } from '../deliveryGroupListItemDtoSchema'
import { z } from 'zod'

/**
 * @description Список групп поставок
 */
export const deliveryGroupsGetDeliveryGroups200Schema = z.array(z.lazy(() => deliveryGroupListItemDtoSchema))

export const deliveryGroupsGetDeliveryGroupsQueryResponseSchema = z.lazy(() => deliveryGroupsGetDeliveryGroups200Schema)