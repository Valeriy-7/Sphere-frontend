import { deliveryPointDtoSchema } from '../deliveryPointDtoSchema'
import { z } from 'zod'

/**
 * @description Полный список точек доставки
 */
export const deliveryPointsGetAllDeliveryPoints200Schema = z.array(z.lazy(() => deliveryPointDtoSchema))

export const deliveryPointsGetAllDeliveryPointsQueryResponseSchema = z.lazy(() => deliveryPointsGetAllDeliveryPoints200Schema)