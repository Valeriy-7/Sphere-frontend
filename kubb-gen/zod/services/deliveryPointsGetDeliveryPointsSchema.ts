import { deliveryPointDtoSchema } from '../deliveryPointDtoSchema'
import { z } from 'zod'

export const deliveryPointsGetDeliveryPointsQueryParamsSchema = z
  .object({
    type: z.enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE']).describe('Тип точки доставки').optional(),
    cabinetId: z.string().describe('ID кабинета, для которого нужно получить точки доставки').optional(),
    onlyPartners: z.boolean().describe('Флаг для получения только партнерских точек доставки').optional(),
  })
  .optional()

/**
 * @description Список точек доставки
 */
export const deliveryPointsGetDeliveryPoints200Schema = z.array(z.lazy(() => deliveryPointDtoSchema))

export const deliveryPointsGetDeliveryPointsQueryResponseSchema = z.lazy(() => deliveryPointsGetDeliveryPoints200Schema)