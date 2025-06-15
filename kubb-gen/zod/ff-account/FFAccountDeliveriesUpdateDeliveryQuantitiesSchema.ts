import { updateProductQuantitiesDtoSchema } from '../updateProductQuantitiesDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Количества успешно обновлены
 */
export const FFAccountDeliveriesUpdateDeliveryQuantities200Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesUpdateDeliveryQuantities404Schema = z.any()

export const FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestSchema = z.lazy(() => updateProductQuantitiesDtoSchema)

export const FFAccountDeliveriesUpdateDeliveryQuantitiesMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateDeliveryQuantities200Schema)