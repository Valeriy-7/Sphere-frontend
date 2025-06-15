import { updateWarehousePlaceDtoSchema } from '../updateWarehousePlaceDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateWarehousePlacePathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Место хранения успешно обновлено
 */
export const FFAccountDeliveriesUpdateWarehousePlace200Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesUpdateWarehousePlace404Schema = z.any()

export const FFAccountDeliveriesUpdateWarehousePlaceMutationRequestSchema = z.lazy(() => updateWarehousePlaceDtoSchema)

export const FFAccountDeliveriesUpdateWarehousePlaceMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateWarehousePlace200Schema)