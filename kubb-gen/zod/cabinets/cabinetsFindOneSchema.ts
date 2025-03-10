import { cabinetResponseDtoSchema } from '../cabinetResponseDtoSchema';
import { z } from 'zod';

export const cabinetsFindOnePathParamsSchema = z.object({
  id: z.string(),
});

/**
 * @description Информация о кабинете успешно получена
 */
export const cabinetsFindOne200Schema = z.lazy(() => cabinetResponseDtoSchema);

/**
 * @description Кабинет не найден
 */
export const cabinetsFindOne404Schema = z.any();

export const cabinetsFindOneQueryResponseSchema = z.lazy(() => cabinetsFindOne200Schema);
