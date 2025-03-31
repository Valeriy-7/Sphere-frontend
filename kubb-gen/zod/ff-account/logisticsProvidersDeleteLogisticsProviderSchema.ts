import { z } from 'zod'

export const logisticsProvidersDeleteLogisticsProviderPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор логиста'),
})

/**
 * @description Логист успешно удален
 */
export const logisticsProvidersDeleteLogisticsProvider200Schema = z.any()

/**
 * @description Логист не найден
 */
export const logisticsProvidersDeleteLogisticsProvider404Schema = z.any()

export const logisticsProvidersDeleteLogisticsProviderMutationResponseSchema = z.lazy(() => logisticsProvidersDeleteLogisticsProvider200Schema)