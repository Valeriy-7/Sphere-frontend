import { z } from 'zod'

export const servicesDeleteServicePathParamsSchema = z.object({
  id: z.string(),
})

export const servicesDeleteService200Schema = z.any()

export const servicesDeleteServiceMutationResponseSchema = z.lazy(() => servicesDeleteService200Schema)