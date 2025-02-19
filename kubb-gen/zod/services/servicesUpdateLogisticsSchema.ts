import { createLogisticsDtoSchema } from '../createLogisticsDtoSchema'
import { logisticsSchema } from '../logisticsSchema'
import { z } from 'zod'

export const servicesUpdateLogisticsPathParamsSchema = z.object({
  id: z.string(),
})

export const servicesUpdateLogistics200Schema = z.lazy(() => logisticsSchema)

export const servicesUpdateLogisticsMutationRequestSchema = z.lazy(() => createLogisticsDtoSchema)

export const servicesUpdateLogisticsMutationResponseSchema = z.lazy(() => servicesUpdateLogistics200Schema)