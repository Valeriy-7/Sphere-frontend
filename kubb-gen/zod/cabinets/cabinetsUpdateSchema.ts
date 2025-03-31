import { cabinetSchema } from '../cabinetSchema'
import { updateCabinetDtoSchema } from '../updateCabinetDtoSchema'
import { z } from 'zod'

export const cabinetsUpdatePathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Настройки кабинета успешно обновлены
 */
export const cabinetsUpdate200Schema = z.lazy(() => cabinetSchema)

/**
 * @description Кабинет не найден
 */
export const cabinetsUpdate404Schema = z.any()

export const cabinetsUpdateMutationRequestSchema = z.lazy(() => updateCabinetDtoSchema)

export const cabinetsUpdateMutationResponseSchema = z.lazy(() => cabinetsUpdate200Schema)