import { logisticsProviderListItemDtoSchema } from '../logisticsProviderListItemDtoSchema';
import { updateLogisticsProviderDtoSchema } from '../updateLogisticsProviderDtoSchema';
import { z } from 'zod';

export const logisticsProvidersUpdateLogisticsProviderPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор логиста'),
});

/**
 * @description Информация о логисте успешно обновлена
 */
export const logisticsProvidersUpdateLogisticsProvider200Schema = z.lazy(
  () => logisticsProviderListItemDtoSchema,
);

/**
 * @description Логист не найден
 */
export const logisticsProvidersUpdateLogisticsProvider404Schema = z.any();

/**
 * @description Данные для обновления логиста
 */
export const logisticsProvidersUpdateLogisticsProviderMutationRequestSchema = z.lazy(
  () => updateLogisticsProviderDtoSchema,
);

export const logisticsProvidersUpdateLogisticsProviderMutationResponseSchema = z.lazy(
  () => logisticsProvidersUpdateLogisticsProvider200Schema,
);
