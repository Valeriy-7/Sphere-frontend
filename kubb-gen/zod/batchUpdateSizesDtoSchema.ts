import { updateSizeQuantitiesDtoSchema } from './updateSizeQuantitiesDtoSchema'
import { z } from 'zod'

export const batchUpdateSizesDtoSchema = z.object({
  sizes: z.array(z.lazy(() => updateSizeQuantitiesDtoSchema)).describe('Array of size updates'),
})