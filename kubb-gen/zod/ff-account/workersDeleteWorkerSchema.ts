import { z } from 'zod'

export const workersDeleteWorkerPathParamsSchema = z.object({
  workerId: z.string().uuid().describe('Идентификатор сотрудника'),
})

/**
 * @description Сотрудник успешно удален
 */
export const workersDeleteWorker200Schema = z.any()

/**
 * @description Сотрудник не найден
 */
export const workersDeleteWorker404Schema = z.any()

export const workersDeleteWorkerMutationResponseSchema = z.lazy(() => workersDeleteWorker200Schema)