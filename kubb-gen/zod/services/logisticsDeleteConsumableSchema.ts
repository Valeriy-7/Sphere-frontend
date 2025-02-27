import { z } from 'zod';

export const logisticsDeleteConsumablePathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Расходник успешно удален
 */
export const logisticsDeleteConsumable200Schema = z.any();

export const logisticsDeleteConsumableMutationResponseSchema = z.lazy(
  () => logisticsDeleteConsumable200Schema,
);
