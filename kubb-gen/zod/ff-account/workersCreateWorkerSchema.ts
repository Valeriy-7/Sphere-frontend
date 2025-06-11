import { createWorkerDtoSchema } from '../createWorkerDtoSchema'
import { workerListItemDtoSchema } from '../workerListItemDtoSchema'
import { z } from 'zod'

/**
 * @description Сотрудник успешно создан
 */
export const workersCreateWorker201Schema = z.lazy(() => workerListItemDtoSchema)

/**
 * @description Данные для создания сотрудника
 */
export const workersCreateWorkerMutationRequestSchema = z.lazy(() => createWorkerDtoSchema)

export const workersCreateWorkerMutationResponseSchema = z.lazy(() => workersCreateWorker201Schema)