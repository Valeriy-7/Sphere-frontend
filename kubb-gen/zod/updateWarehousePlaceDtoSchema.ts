import { z } from 'zod'

export const updateWarehousePlaceDtoSchema = z.object({
  warehousePlace: z.string().describe('Новое место хранения для поставки'),
})