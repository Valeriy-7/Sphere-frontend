import { createLogisticsDtoSchema } from '../createLogisticsDtoSchema'
import { logisticsSchema } from '../logisticsSchema'
import { z } from 'zod'

export const servicesCreateLogistics201Schema = z.lazy(() => logisticsSchema)

export const servicesCreateLogisticsMutationRequestSchema = z.lazy(() => createLogisticsDtoSchema)

export const servicesCreateLogisticsMutationResponseSchema = z.lazy(() => servicesCreateLogistics201Schema)