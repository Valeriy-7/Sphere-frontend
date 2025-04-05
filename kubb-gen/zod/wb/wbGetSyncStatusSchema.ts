import { z } from 'zod'

export const wbGetSyncStatusQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
})

/**
 * @description Статус синхронизации получен
 */
export const wbGetSyncStatus200Schema = z.any()

export const wbGetSyncStatusQueryResponseSchema = z.lazy(() => wbGetSyncStatus200Schema)