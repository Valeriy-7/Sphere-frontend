import { workerListItemDtoSchema } from '../workerListItemDtoSchema'
import { z } from 'zod'

export const workersGetWorkerPathParamsSchema = z.object({
  workerId: z.string().uuid().describe('Идентификатор сотрудника'),
})

/**
 * @description Информация о сотруднике
 */
export const workersGetWorker200Schema = z.lazy(() => workerListItemDtoSchema)

/**
 * @description Сотрудник не найден
 */
export const workersGetWorker404Schema = z.any()

export const workersGetWorkerQueryResponseSchema = z.lazy(() => workersGetWorker200Schema)