import { consumableSchema } from '../consumableSchema';
import { createConsumableDtoSchema } from '../createConsumableDtoSchema';
import { z } from 'zod';

export const logisticsUpdateConsumablePathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Расходник успешно обновлен
 */
export const logisticsUpdateConsumable200Schema = z.lazy(() => consumableSchema);

export const logisticsUpdateConsumableMutationRequestSchema = z.lazy(
  () => createConsumableDtoSchema,
);

export const logisticsUpdateConsumableMutationResponseSchema = z.lazy(
  () => logisticsUpdateConsumable200Schema,
);
