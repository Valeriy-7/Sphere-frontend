import { z } from 'zod'

export const cabinetsFixCabinetNamesPathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Результат обновления
 */
export const cabinetsFixCabinetNames200Schema = z.boolean()

export const cabinetsFixCabinetNamesMutationResponseSchema = z.lazy(() => cabinetsFixCabinetNames200Schema)