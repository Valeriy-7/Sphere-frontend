import { logisticsPriceDtoSchema } from '../logisticsPriceDtoSchema'
import { z } from 'zod'

export const logisticsPriceGetLogisticsPriceQueryParamsSchema = z.object({
  supplierId: z.string().describe('ID поставщика'),
  toPointType: z
    .enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE'])
    .describe('Тип точки назначения (необязательно, будет использован тип FULFILLMENT)')
    .optional(),
})

/**
 * @description Информация о цене логистики
 */
export const logisticsPriceGetLogisticsPrice200Schema = z.lazy(() => logisticsPriceDtoSchema)

/**
 * @description Логистика между указанными точками не найдена
 */
export const logisticsPriceGetLogisticsPrice404Schema = z.any()

export const logisticsPriceGetLogisticsPriceQueryResponseSchema = z.lazy(() => logisticsPriceGetLogisticsPrice200Schema)