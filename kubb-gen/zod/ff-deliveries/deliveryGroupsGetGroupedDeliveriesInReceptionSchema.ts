import { z } from 'zod'

/**
 * @description Сгруппированные и несгруппированные поставки в приемке
 */
export const deliveryGroupsGetGroupedDeliveriesInReception200Schema = z.any()

export const deliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseSchema = z.lazy(() => deliveryGroupsGetGroupedDeliveriesInReception200Schema)