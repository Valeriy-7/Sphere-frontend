import { assignLogisticsProviderDtoSchema } from '../assignLogisticsProviderDtoSchema';
import { z } from 'zod';

export const FFAccountDeliveriesAssignLogisticsProviderPathParamsSchema = z.object({
  id: z.string().uuid().describe('Идентификатор поставки'),
});

/**
 * @description Логист успешно назначен
 */
export const FFAccountDeliveriesAssignLogisticsProvider200Schema = z.any();

/**
 * @description Поставка или логист не найдены
 */
export const FFAccountDeliveriesAssignLogisticsProvider404Schema = z.any();

/**
 * @description Данные для назначения логиста
 */
export const FFAccountDeliveriesAssignLogisticsProviderMutationRequestSchema = z.lazy(
  () => assignLogisticsProviderDtoSchema,
);

export const FFAccountDeliveriesAssignLogisticsProviderMutationResponseSchema = z.lazy(
  () => FFAccountDeliveriesAssignLogisticsProvider200Schema,
);
