import { workerListItemDtoSchema } from '../workerListItemDtoSchema'
import { z } from 'zod'

/**
 * @description Список сотрудников
 */
export const workersGetWorkers200Schema = z.array(z.lazy(() => workerListItemDtoSchema))

export const workersGetWorkersQueryResponseSchema = z.lazy(() => workersGetWorkers200Schema)