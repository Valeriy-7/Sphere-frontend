import { z } from 'zod';

export const wbSyncDataQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
});

/**
 * @description Синхронизация успешно выполнена
 */
export const wbSyncData200Schema = z.any();

export const wbSyncDataQueryResponseSchema = z.lazy(() => wbSyncData200Schema);
