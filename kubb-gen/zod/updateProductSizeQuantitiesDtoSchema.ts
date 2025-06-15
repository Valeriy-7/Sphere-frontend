import { productSizeQuantityDtoSchema } from './productSizeQuantityDtoSchema'
import { z } from 'zod'

export const updateProductSizeQuantitiesDtoSchema = z.object({
  sizes: z.array(z.lazy(() => productSizeQuantityDtoSchema)).describe('Массив количеств по размерам'),
})