import { createServiceDtoSchema } from '../createServiceDtoSchema'
import { serviceSchema } from '../serviceSchema'
import { z } from 'zod'

export const servicesUpdateServicePathParamsSchema = z.object({
  id: z.string(),
})

export const servicesUpdateService200Schema = z.lazy(() => serviceSchema)

export const servicesUpdateServiceMutationRequestSchema = z.lazy(() => createServiceDtoSchema)

export const servicesUpdateServiceMutationResponseSchema = z.lazy(() => servicesUpdateService200Schema)