import { z } from 'zod'

export const logisticsTypeDeleteLogisticsTypePathParamsSchema = z.object({
  id: z.string().describe('ID типа логистики'),
})

/**
 * @description Тип логистики успешно удален
 */
export const logisticsTypeDeleteLogisticsType200Schema = z.any()

export const logisticsTypeDeleteLogisticsTypeMutationResponseSchema = z.lazy(() => logisticsTypeDeleteLogisticsType200Schema)