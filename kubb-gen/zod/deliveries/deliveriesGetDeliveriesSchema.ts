import { deliverySchema } from '../deliverySchema'
import { z } from 'zod'

export const deliveriesGetDeliveriesQueryParamsSchema = z
  .object({
    startDate: z.date().describe('Дата начала периода').optional(),
    endDate: z.date().describe('Дата окончания периода').optional(),
  })
  .optional()

/**
 * @description Список поставок успешно получен
 */
export const deliveriesGetDeliveries200Schema = z.array(z.lazy(() => deliverySchema))

export const deliveriesGetDeliveriesQueryResponseSchema = z.lazy(() => deliveriesGetDeliveries200Schema)