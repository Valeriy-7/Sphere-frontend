import { activateCabinetDtoSchema } from '../activateCabinetDtoSchema';
import { cabinetSchema } from '../cabinetSchema';
import { z } from 'zod';

export const cabinetsSetActivePathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Кабинет успешно активирован
 */
export const cabinetsSetActive200Schema = z.lazy(() => cabinetSchema);

/**
 * @description Кабинет не найден
 */
export const cabinetsSetActive404Schema = z.any();

export const cabinetsSetActiveMutationRequestSchema = z.lazy(() => activateCabinetDtoSchema);

export const cabinetsSetActiveMutationResponseSchema = z.lazy(() => cabinetsSetActive200Schema);
