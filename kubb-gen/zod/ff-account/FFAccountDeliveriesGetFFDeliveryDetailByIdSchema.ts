import { FFDeliveryDetailWithRoutesDtoSchema } from '../FFDeliveryDetailWithRoutesDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Детали поставки успешно получены
 */
export const FFAccountDeliveriesGetFFDeliveryDetailById200Schema = z.lazy(() => FFDeliveryDetailWithRoutesDtoSchema)

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesGetFFDeliveryDetailById404Schema = z.any()

export const FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseSchema = z.lazy(() => FFAccountDeliveriesGetFFDeliveryDetailById200Schema)