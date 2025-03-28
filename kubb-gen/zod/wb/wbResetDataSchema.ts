import { z } from 'zod';

export const wbResetDataQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
});

/**
 * @description Данные успешно сброшены и синхронизированы
 */
export const wbResetData200Schema = z.any();

export const wbResetDataQueryResponseSchema = z.lazy(() => wbResetData200Schema);
