import { logisticsTypeSchema } from '../logisticsTypeSchema'
import { z } from 'zod'

/**
 * @description Список типов логистики успешно получен
 */
export const logisticsTypeGetLogisticsTypes200Schema = z.array(z.lazy(() => logisticsTypeSchema))

export const logisticsTypeGetLogisticsTypesQueryResponseSchema = z.lazy(() => logisticsTypeGetLogisticsTypes200Schema)