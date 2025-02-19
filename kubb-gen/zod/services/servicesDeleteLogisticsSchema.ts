import { z } from 'zod'

export const servicesDeleteLogisticsPathParamsSchema = z.object({
  id: z.string(),
})

export const servicesDeleteLogistics200Schema = z.any()

export const servicesDeleteLogisticsMutationResponseSchema = z.lazy(() => servicesDeleteLogistics200Schema)