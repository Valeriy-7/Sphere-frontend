import { z } from 'zod'

export const FFAccountDeliveriesUpdateLogisticsProviderPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
})

/**
 * @description Логист успешно обновлен
 */
export const FFAccountDeliveriesUpdateLogisticsProvider200Schema = z.any()

/**
 * @description Поставка не найдена или логист не найден
 */
export const FFAccountDeliveriesUpdateLogisticsProvider404Schema = z.any()

export const FFAccountDeliveriesUpdateLogisticsProviderMutationResponseSchema = z.lazy(() => FFAccountDeliveriesUpdateLogisticsProvider200Schema)