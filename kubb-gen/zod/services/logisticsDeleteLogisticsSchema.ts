import { z } from 'zod';

export const logisticsDeleteLogisticsPathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Логистика успешно удалена
 */
export const logisticsDeleteLogistics200Schema = z.any();

export const logisticsDeleteLogisticsMutationResponseSchema = z.lazy(
  () => logisticsDeleteLogistics200Schema,
);
