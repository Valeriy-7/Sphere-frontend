import { z } from 'zod';

export const cabinetsRemovePathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Кабинет успешно удален
 */
export const cabinetsRemove204Schema = z.any();

/**
 * @description Кабинет не найден
 */
export const cabinetsRemove404Schema = z.any();

export const cabinetsRemoveMutationResponseSchema = z.lazy(() => cabinetsRemove204Schema);
