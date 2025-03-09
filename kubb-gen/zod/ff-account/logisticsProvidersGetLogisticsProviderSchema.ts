import { logisticsProviderListItemDtoSchema } from '../logisticsProviderListItemDtoSchema';
import { z } from 'zod';

export const logisticsProvidersGetLogisticsProviderPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор логиста'),
});

/**
 * @description Информация о логисте
 */
export const logisticsProvidersGetLogisticsProvider200Schema = z.lazy(
  () => logisticsProviderListItemDtoSchema,
);

/**
 * @description Логист не найден
 */
export const logisticsProvidersGetLogisticsProvider404Schema = z.any();

export const logisticsProvidersGetLogisticsProviderQueryResponseSchema = z.lazy(
  () => logisticsProvidersGetLogisticsProvider200Schema,
);
