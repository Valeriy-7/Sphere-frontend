import { cabinetSchema } from '../cabinetSchema'
import { z } from 'zod'

/**
 * @description Активный кабинет успешно получен
 */
export const cabinetsGetActive200Schema = z.lazy(() => cabinetSchema)

/**
 * @description Активный кабинет не найден
 */
export const cabinetsGetActive404Schema = z.any()

export const cabinetsGetActiveQueryResponseSchema = z.lazy(() => cabinetsGetActive200Schema)