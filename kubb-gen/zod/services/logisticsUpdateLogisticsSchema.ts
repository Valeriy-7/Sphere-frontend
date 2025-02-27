import { createLogisticsDtoSchema } from '../createLogisticsDtoSchema';
import { logisticsSchema } from '../logisticsSchema';
import { z } from 'zod';

export const logisticsUpdateLogisticsPathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Логистика успешно обновлена
 */
export const logisticsUpdateLogistics200Schema = z.lazy(() => logisticsSchema);

export const logisticsUpdateLogisticsMutationRequestSchema = z.lazy(() => createLogisticsDtoSchema);

export const logisticsUpdateLogisticsMutationResponseSchema = z.lazy(
  () => logisticsUpdateLogistics200Schema,
);
