import { updateProductStorageDataDtoSchema } from './updateProductStorageDataDtoSchema'
import { z } from 'zod'

export const preparationEventDtoSchema = z.object({
  deliveryId: z.string().uuid().describe('Delivery ID being prepared'),
  products: z.array(z.lazy(() => updateProductStorageDataDtoSchema)).describe('Product updates during preparation'),
  notes: z.string().describe('Preparation notes').optional(),
})