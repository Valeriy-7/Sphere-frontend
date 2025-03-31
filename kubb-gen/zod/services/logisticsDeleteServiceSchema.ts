import { z } from 'zod'

export const logisticsDeleteServicePathParamsSchema = z.object({
  id: z.string(),
})

/**
 * @description Услуга успешно удалена
 */
export const logisticsDeleteService200Schema = z.any()

export const logisticsDeleteServiceMutationResponseSchema = z.lazy(() => logisticsDeleteService200Schema)