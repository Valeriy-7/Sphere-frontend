import { updateCargoDimensionsDtoSchema } from '../updateCargoDimensionsDtoSchema'
import { z } from 'zod'

export const FFAccountDeliveriesUpdateCargoDimensionsPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
})

/**
 * @description Размеры груза успешно обновлены
 */
export const FFAccountDeliveriesUpdateCargoDimensions200Schema = z.any()

/**
 * @description Поставка не найдена
 */
export const FFAccountDeliveriesUpdateCargoDimensions404Schema = z.any()

/**
 * @description Данные для обновления размеров груза
 */
export const FFAccountDeliveriesUpdateCargoDimensionsMutationRequestSchema = z.lazy(() => updateCargoDimensionsDtoSchema)

export const FFAccountDeliveriesUpdateCargoDimensionsMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateCargoDimensions200Schema)