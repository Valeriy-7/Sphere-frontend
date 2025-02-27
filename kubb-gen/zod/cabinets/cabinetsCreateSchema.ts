import { cabinetSchema } from '../cabinetSchema';
import { createCabinetDtoSchema } from '../createCabinetDtoSchema';
import { z } from 'zod';

/**
 * @description Кабинет успешно создан
 */
export const cabinetsCreate201Schema = z.lazy(() => cabinetSchema);

/**
 * @description Ошибка валидации
 */
export const cabinetsCreate400Schema = z.any();

export const cabinetsCreateMutationRequestSchema = z.lazy(() => createCabinetDtoSchema);

export const cabinetsCreateMutationResponseSchema = z.lazy(() => cabinetsCreate201Schema);
