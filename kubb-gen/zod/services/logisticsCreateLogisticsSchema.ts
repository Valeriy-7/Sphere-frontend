import { createLogisticsDtoSchema } from '../createLogisticsDtoSchema';
import { logisticsSchema } from '../logisticsSchema';
import { z } from 'zod';

/**
 * @description Логистика успешно создана
 */
export const logisticsCreateLogistics201Schema = z.lazy(() => logisticsSchema);

export const logisticsCreateLogisticsMutationRequestSchema = z.lazy(() => createLogisticsDtoSchema);

export const logisticsCreateLogisticsMutationResponseSchema = z.lazy(
  () => logisticsCreateLogistics201Schema,
);
