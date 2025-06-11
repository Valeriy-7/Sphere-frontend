import { z } from 'zod'

export const FFAccountDeliveriesAssignLogisticsTypePathParamsSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
})

/**
 * @description Тип логистики успешно назначен
 */
export const FFAccountDeliveriesAssignLogisticsType200Schema = z.any()

/**
 * @description Поставка или тип логистики не найден(ы)
 */
export const FFAccountDeliveriesAssignLogisticsType404Schema = z.any()

/**
 * @description ID типа логистики
 */
export const FFAccountDeliveriesAssignLogisticsTypeMutationRequestSchema = z.object({
  logisticsTypeId: z.string().uuid(),
})

export const FFAccountDeliveriesAssignLogisticsTypeMutationResponseSchema = z.lazy(() => FFAccountDeliveriesAssignLogisticsType200Schema)