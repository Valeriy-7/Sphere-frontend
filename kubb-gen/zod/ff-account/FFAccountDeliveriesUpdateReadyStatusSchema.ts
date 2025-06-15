import { updateReadyStatusDtoSchema } from '../updateReadyStatusDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateReadyStatusPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Статус готовности успешно обновлен
 */
export const FFAccountDeliveriesUpdateReadyStatus200Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesUpdateReadyStatus404Schema = z.any()

export const FFAccountDeliveriesUpdateReadyStatusMutationRequestSchema = z.lazy(() => updateReadyStatusDtoSchema)

export const FFAccountDeliveriesUpdateReadyStatusMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateReadyStatus200Schema)