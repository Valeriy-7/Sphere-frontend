import { updateWorkerDtoSchema } from '../updateWorkerDtoSchema'
import { workerListItemDtoSchema } from '../workerListItemDtoSchema'
import { z } from 'zod'

export const workersUpdateWorkerPathParamsSchema = z.object({
  workerId: z.string().uuid().describe('Идентификатор сотрудника'),
})

/**
 * @description Информация о сотруднике успешно обновлена
 */
export const workersUpdateWorker200Schema = z.lazy(() => workerListItemDtoSchema)

/**
 * @description Сотрудник не найден
 */
export const workersUpdateWorker404Schema = z.any()

/**
 * @description Данные для обновления сотрудника
 */
export const workersUpdateWorkerMutationRequestSchema = z.lazy(() => updateWorkerDtoSchema)

export const workersUpdateWorkerMutationResponseSchema = z.lazy(() => workersUpdateWorker200Schema)