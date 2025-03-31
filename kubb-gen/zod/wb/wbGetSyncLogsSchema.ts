import { z } from 'zod'

export const wbGetSyncLogsQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
})

/**
 * @description Логи успешно получены
 */
export const wbGetSyncLogs200Schema = z.object({})

export const wbGetSyncLogsQueryResponseSchema = z.lazy(() => wbGetSyncLogs200Schema)