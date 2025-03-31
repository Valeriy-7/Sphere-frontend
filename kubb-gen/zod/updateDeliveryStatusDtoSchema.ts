import { deliveryStatusSchema } from './deliveryStatusSchema'
import { z } from 'zod'

export const updateDeliveryStatusDtoSchema = z.object({
  status: z.lazy(() => deliveryStatusSchema).describe('Новый статус поставки'),
})